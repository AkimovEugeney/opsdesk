"""Behavior checks for learning bookkeeping; all writes use temporary state."""

from copy import deepcopy
from datetime import date
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

import learning


class LearningTests(unittest.TestCase):
    def setUp(self):
        self.state = learning.load(learning.DEFAULT_STATE)
        self.state["events"] = []
        self.key = "raw-result-contract"

    def event(self, on="2026-09-09", kind="independent", context="OPS-A", **fields):
        event = dict(id=f"{on}:{kind}:{context}", concept=self.key, kind=kind, on=on,
                     context=context, source="temporary-test-evidence", note="Observed changed-data behavior",
                     verified=kind == "independent", until=None)
        event.update(fields)
        learning.record(self.state, event)
        return event

    def test_greeting_and_continuation_never_start_overdue_quiz(self):
        for intent in ("hello", "continue", "new"):
            plan = learning.status(self.state, date(2027, 1, 1), intent)
            self.assertFalse(plan["opening_quiz"])
            self.assertEqual(plan["first_action"], "resume_or_choose_product_work")
            self.assertEqual(plan["practice_opportunities"], [])
            self.assertGreater(plan["due_count_internal_only"], 0)

    def test_only_task_relevant_due_concepts_are_suggested_during_work(self):
        plan = learning.status(self.state, date(2026, 9, 20), "continue", [self.key])
        self.assertEqual(plan["practice_opportunities"], [self.key])
        self.assertTrue(plan["review_is_optional"])

    def test_three_days_and_two_contexts_retire_natural_practice(self):
        for on, context in (("2026-09-09", "OPS-A"), ("2026-09-12", "OPS-B"), ("2026-09-19", "OPS-B")):
            self.event(on=on, context=context)
        result = learning.project(self.state, self.key)
        self.assertEqual(result["recorded_applications"], 3)
        self.assertEqual(result["status"], "CONFIRMED")
        self.assertEqual(result["retention"], "parked")
        self.assertIsNone(result["next_review_on"])

    def test_same_day_or_same_context_does_not_fake_transfer(self):
        self.event(context="A")
        self.event(context="B")
        result = learning.project(self.state, self.key)
        self.assertEqual(result["successful_days_since_gap"], 1)
        self.assertEqual(result["next_review_on"], "2026-09-12")
        self.state["events"] = []
        for on in ("2026-09-09", "2026-09-12", "2026-09-19"):
            self.event(on=on)
        self.assertEqual(learning.project(self.state, self.key)["retention"], "active")

    def test_teaching_day_application_does_not_advance_delayed_recall(self):
        self.event(kind="assisted")
        self.event(context="changed-example")
        result = learning.project(self.state, self.key)
        self.assertEqual(result["learning_episodes"], 2)
        self.assertEqual(result["recorded_applications"], 1)
        self.assertEqual(result["successful_days_since_gap"], 0)
        self.assertEqual(result["next_review_on"], "2026-09-10")

    def test_teaching_previously_unscheduled_baseline_gets_an_opportunity(self):
        self.event(concept="js-closures", kind="introduced")
        result = learning.project(self.state, "js-closures")
        self.assertEqual(result["next_review_on"], "2026-09-10")
        self.assertEqual(result["successful_days_since_gap"], 0)

    def test_duplicate_observation_is_idempotent_and_conflict_is_rejected(self):
        event = self.event()
        self.assertFalse(learning.record(self.state, deepcopy(event)))
        with self.assertRaises(ValueError):
            learning.record(self.state, dict(event, note="Different observation"))
        self.assertEqual(learning.project(self.state, self.key)["recorded_applications"], 1)

    def test_confidence_and_deferral_do_not_increment_mastery(self):
        self.event(kind="self_report", until="2026-09-20")
        result = learning.project(self.state, self.key)
        self.assertEqual(result["recorded_applications"], 0)
        self.assertEqual(result["status"], "PRACTICING")
        self.assertEqual(result["next_review_on"], "2026-09-20")
        self.assertNotIn(self.key, learning.status(self.state, date(2026, 9, 19), "review")["practice_opportunities"])

    def test_gap_reopens_only_affected_concept_without_erasing_history(self):
        for on, context in (("2026-09-09", "A"), ("2026-09-12", "B"), ("2026-09-19", "B")):
            self.event(on=on, context=context)
        self.event(on="2026-09-20", kind="gap")
        result = learning.project(self.state, self.key)
        self.assertEqual(result["recorded_applications"], 3)
        self.assertEqual(result["successful_days_since_gap"], 0)
        self.assertEqual(result["next_review_on"], "2026-09-21")
        self.assertEqual(learning.project(self.state, "layer-responsibilities")["retention"], "parked")

    def test_lookup_and_parked_are_never_scheduled(self):
        self.event(concept="prisma-reference", kind="gap")
        plan = learning.status(self.state, date(2027, 1, 1), "recall")
        self.assertNotIn("prisma-reference", plan["practice_opportunities"])
        self.assertNotIn("layer-responsibilities", plan["practice_opportunities"])
        self.assertIsNone(learning.project(self.state, "prisma-reference")["next_review_on"])

    def test_invalid_evidence_is_rejected_without_mutation(self):
        for overrides in ({"verified": False}, {"concept": "invented"}, {"source": ""}):
            with self.assertRaises((ValueError, KeyError)):
                self.event(**overrides)
            self.assertEqual(self.state["events"], [])
        self.event(on="2026-09-12")
        with self.assertRaises(ValueError):
            self.event(on="2026-09-09")
        self.assertEqual(len(self.state["events"]), 1)

    def test_status_preserves_diagnostic_baseline_and_is_read_only(self):
        before = deepcopy(self.state)
        result = learning.status(self.state, date(2026, 9, 8))
        self.assertEqual(self.state, before)
        self.assertEqual(result["counts_since"], "2026-09-08")
        self.assertIn("react-state-hooks", self.state["concepts"])
        self.assertIn("OPS-000", self.state["concepts"]["react-state-hooks"]["baseline"]["summary"])
        self.assertIsNone(learning.project(self.state, self.key)["historical_repetition_count"])

    def test_cli_persists_once_and_invalid_retry_preserves_file(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "state.json"
            learning.save(path, self.state)
            command = [sys.executable, str(learning.ROOT / "scripts/learning.py"), "--state", str(path),
                       "record", "--id", "observation-1", "--concept", self.key, "--kind", "independent",
                       "--on", "2026-09-09", "--context", "A", "--source", "test", "--note", "verified", "--verified"]
            first = subprocess.run(command, capture_output=True, text=True, check=True)
            second = subprocess.run(command, capture_output=True, text=True, check=True)
            self.assertTrue(json.loads(first.stdout)["recorded"])
            self.assertFalse(json.loads(second.stdout)["recorded"])
            saved = path.read_bytes()
            command[command.index("--note") + 1] = "conflicting"
            conflict = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(conflict.returncode, 2)
            self.assertEqual(path.read_bytes(), saved)


if __name__ == "__main__":
    unittest.main()
