#!/usr/bin/env python3
"""Local learning ledger. Counts observed practice; never quizzes the learner."""

import argparse
from collections import Counter
from contextlib import contextmanager
from datetime import date, timedelta
import fcntl
import json
import os
from pathlib import Path
import tempfile

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_STATE = ROOT / "docs/learning/learning-state.json"
KINDS = {"introduced", "independent", "assisted", "gap", "defer", "self_report", "park", "reopen"}
TARGETS = {"WRITE", "UNDERSTAND", "LOOKUP"}
STATUSES = {"UNKNOWN", "NEW", "PRACTICING", "CONFIRMED", "ROUTINE"}


def day(value):
    return date.fromisoformat(value)


def validate(state):
    if state.get("schema_version") != 1:
        raise ValueError("Unsupported learning-state schema")
    if state["current_stage"] not in state["stages"]:
        raise ValueError("Unknown current stage")
    for key, concept in state["concepts"].items():
        if concept["target"] not in TARGETS or concept["baseline"]["status"] not in STATUSES:
            raise ValueError(f"Invalid target/status for {key}")
        if not concept["capabilities"] or not set(concept["capabilities"]) <= set(state["capabilities"]):
            raise ValueError(f"Invalid capability mapping for {key}")
        baseline = concept["baseline"]
        if baseline["retention"] not in {"active", "parked", "unintroduced", "lookup"}:
            raise ValueError(f"Invalid retention mode for {key}")
        if baseline.get("next_review_on"):
            day(baseline["next_review_on"])
    ids, latest = set(), {}
    for event in state["events"]:
        key = event["concept"]
        if key not in state["concepts"] or event["kind"] not in KINDS:
            raise ValueError("Unknown event concept or kind")
        if not all(event.get(field, "").strip() for field in ("id", "context", "source", "note")):
            raise ValueError("Every event needs an id, context, source and evidence note")
        if event["id"] in ids or day(event["on"]) < latest.get(key, date.min):
            raise ValueError("Duplicate event id or out-of-order concept history")
        if event["kind"] == "independent" and event.get("verified") is not True:
            raise ValueError("Independent practice requires observed correctness/validation")
        if event.get("until"):
            if day(event["until"]) <= day(event["on"]):
                raise ValueError("Deferral must end after the observation date")
        if event["kind"] in {"defer", "self_report"} and not event.get("until"):
            raise ValueError("Deferral/self-report needs a next optional review date")
        ids.add(event["id"])
        latest[key] = day(event["on"])


def load(path):
    state = json.loads(path.read_text())
    validate(state)
    return state


def project(state, key):
    concept = state["concepts"][key]
    base = concept["baseline"]
    result = dict(base)
    result.update(id=key, title=concept["title"], target=concept["target"],
                  capabilities=concept["capabilities"], recorded_applications=0,
                  learning_episodes=0, independent_days=0, successful_days_since_gap=0, last_observed_on=None)
    all_days, success_days, contexts = set(), set(), set()
    teaching_day = None
    for event in state["events"]:
        if event["concept"] != key:
            continue
        when, kind = day(event["on"]), event["kind"]
        result["last_observed_on"] = event["on"]
        result["last_note"] = event["note"]
        if kind in {"introduced", "independent", "assisted", "gap"}:
            result["learning_episodes"] += 1
        if kind == "independent":
            result["recorded_applications"] += 1
            all_days.add(event["on"])
            if event["on"] == teaching_day:
                # Application right after teaching is useful, but not delayed recall.
                continue
            new_day = event["on"] not in success_days
            success_days.add(event["on"])
            contexts.add(event["context"])
            result["status"] = "PRACTICING" if result["status"] in {"UNKNOWN", "NEW"} else result["status"]
            if len(success_days) >= 3 and len(contexts) >= 2:
                result.update(status="CONFIRMED", retention="parked", next_review_on=None,
                              park_reason="Three successful days across at least two contexts")
            elif new_day and result["retention"] != "parked":
                gap = (3, 7, 21)[min(len(success_days) - 1, 2)]
                result.update(retention="active", next_review_on=(when + timedelta(days=gap)).isoformat())
        elif kind in {"assisted", "gap"}:
            teaching_day = event["on"]
            success_days.clear()
            contexts.clear()
            result.update(status="PRACTICING" if result["status"] != "UNKNOWN" else "NEW",
                          retention="active", next_review_on=(when + timedelta(days=1)).isoformat())
        elif kind == "introduced":
            teaching_day = event["on"]
            if result["status"] == "UNKNOWN":
                result["status"] = "NEW"
            if result["retention"] == "unintroduced" or (result["retention"] == "active" and not result.get("next_review_on")):
                result.update(retention="active", next_review_on=(when + timedelta(days=1)).isoformat())
        elif kind in {"defer", "self_report"}:
            if result["retention"] == "active":
                result["next_review_on"] = event["until"]
        elif kind == "park":
            result.update(retention="parked", next_review_on=None, park_reason=event["note"])
        elif kind == "reopen":
            success_days.clear()
            contexts.clear()
            result.update(retention="active", next_review_on=event["on"])
    result["independent_days"] = len(all_days)
    result["successful_days_since_gap"] = len(success_days)
    if concept["target"] == "LOOKUP":
        result.update(retention="lookup", next_review_on=None)
    return result


def status(state, today, intent="continue", relevant=()):
    concepts = [project(state, key) for key in state["concepts"]]
    unknown = set(relevant) - set(state["concepts"])
    if unknown:
        raise ValueError(f"Unknown relevant concepts: {sorted(unknown)}")
    due = [c for c in concepts if c["retention"] == "active" and c.get("next_review_on")
           and day(c["next_review_on"]) <= today]
    due.sort(key=lambda c: (c["id"] not in relevant, c["next_review_on"], c["id"]))
    eligible = due if intent in {"review", "recall"} else [c for c in due if c["id"] in relevant]
    return {
        "goal": state["goal"], "stage": state["stages"][state["current_stage"]],
        "counts_since": state["tracking_started_on"],
        "historical_counts": "Unknown where not recorded; baseline evidence is preserved",
        "intent": intent, "first_action": "resume_or_choose_product_work" if intent != "recall" else "requested_recall",
        "opening_quiz": False, "review_is_optional": intent != "recall",
        "practice_opportunities": [c["id"] for c in eligible[:2]],
        "due_count_internal_only": len(due),
        "capability_progress": {key: dict(Counter(c["status"] for c in concepts if key in c["capabilities"]))
                                for key in state["capabilities"]},
        "concepts": concepts,
    }


@contextmanager
def locked(path):
    # Stable separate inode: all CLI writers share this lock across atomic replaces.
    with path.with_suffix(".lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        yield


def save(path, state):
    validate(state)
    temp = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", dir=path.parent, delete=False) as stream:
            temp = Path(stream.name)
            json.dump(state, stream, ensure_ascii=False, indent=2)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp, path)
    finally:
        if temp and temp.exists():
            temp.unlink()


def record(state, event):
    existing = next((e for e in state["events"] if e["id"] == event["id"]), None)
    if existing:
        if existing != event:
            raise ValueError("Event id already exists with different evidence")
        return False
    state["events"].append(event)
    try:
        validate(state)
    except (ValueError, KeyError, TypeError):
        state["events"].pop()
        raise
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--state", type=Path, default=DEFAULT_STATE)
    commands = parser.add_subparsers(dest="command", required=True)
    show = commands.add_parser("status")
    show.add_argument("--today", type=day, default=date.today())
    show.add_argument("--intent", choices=["hello", "continue", "new", "review", "recall"], default="continue")
    show.add_argument("--concept", action="append", default=[])
    commands.add_parser("validate")
    add = commands.add_parser("record")
    for name in ("id", "concept", "context", "source", "note"):
        add.add_argument("--" + name, required=True)
    add.add_argument("--kind", choices=sorted(KINDS), required=True)
    add.add_argument("--on", type=day, required=True)
    add.add_argument("--until", type=day)
    add.add_argument("--verified", action="store_true")
    args = parser.parse_args()
    try:
        if args.command == "record":
            event = {key: getattr(args, key) for key in ("id", "concept", "context", "source", "note", "kind", "verified")}
            event.update(on=args.on.isoformat(), until=args.until.isoformat() if args.until else None)
            with locked(args.state):
                state = load(args.state)
                changed = record(state, event)
                if changed:
                    save(args.state, state)
            output = {"recorded": changed, "concept": project(state, args.concept)}
        else:
            state = load(args.state)
            output = {"valid": True} if args.command == "validate" else status(state, args.today, args.intent, args.concept)
        print(json.dumps(output, ensure_ascii=False, indent=2))
    except (OSError, ValueError, KeyError, TypeError) as error:
        parser.exit(2, f"Learning ledger error: {error}\n")


if __name__ == "__main__":
    main()
