import { SESSION_ABSOLUTE_TIMEOUT_MS, SESSION_IDLE_TIMEOUT_MS } from './session.constants'

export function isSessionExpired(
  createdAt: Date,
  lastActivityAt: Date,
  now: Date = new Date(),
): boolean {
  const idleDurationMs = now.getTime() - lastActivityAt.getTime()
  const sessionAgeMs = now.getTime() - createdAt.getTime()

  return (
    idleDurationMs >= SESSION_IDLE_TIMEOUT_MS || sessionAgeMs >= SESSION_ABSOLUTE_TIMEOUT_MS
  )
}
