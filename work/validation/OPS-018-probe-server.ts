import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'

type Message = Record<string, unknown>
type DriverClient = { processID?: number; query: (...args: unknown[]) => unknown }
type ConnectionState = { inTransaction: boolean; isolation: string }

const apiRoot = resolve(__dirname, '../../apps/api')
const apiRequire = createRequire(resolve(apiRoot, 'package.json'))
const driver = apiRequire('pg') as { Client: { prototype: DriverClient } }
const originalQuery = driver.Client.prototype.query
const connections = new WeakMap<object, ConnectionState>()
let armed = false
let readCount = 0
let firstPid: number | null = null
let targetPid: number | null = null
let observing = false
let paused = false
let releaseGate: (() => void) | undefined

function emit(message: Message): void {
  if (process.connected && process.send) process.send(message)
}

function record(value: unknown): Message | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Message : null
}

function textOf(value: unknown): string {
  if (typeof value === 'string') return value
  const item = record(value)
  return typeof item?.text === 'string' ? item.text : ''
}

function isPromise(value: unknown): value is Promise<unknown> {
  return typeof record(value)?.then === 'function'
}

// Validation-only, process-scoped barrier: SQL, parameters and real results pass unchanged.
// Pausing after a completed count exposes a deterministic concurrent HTTP assignment window.
driver.Client.prototype.query = function (this: DriverClient, ...args: unknown[]): unknown {
  const sql = textOf(args[0])
  const upper = sql.trim().toUpperCase()
  const pid = this.processID ?? null
  let state = connections.get(this)
  if (!state) {
    state = { inTransaction: false, isolation: 'unspecified' }
    connections.set(this, state)
  }
  if (paused && /\bUPDATE\b/i.test(sql) && sql.includes('"Appeal"')) {
    emit({ kind: 'concurrent-write-start', pid, sqlSha256: createHash('sha256').update(sql).digest('hex') })
  }
  const result = originalQuery.apply(this, args)
  // Preserve callback-based pg calls as well as Promise-based adapter calls.
  if (!isPromise(result)) return result
  const connection = state
  return result.then(async (value: unknown): Promise<unknown> => {
    if (upper === 'BEGIN' || upper.startsWith('BEGIN ')) {
      connection.inTransaction = true
      connection.isolation = 'unspecified'
    }
    if (upper.includes('SET TRANSACTION ISOLATION LEVEL')) {
      connection.isolation = upper.includes('REPEATABLE READ') ? 'RepeatableRead' : upper
    }
    if (armed && sql.includes('"Appeal"') && /\bCOUNT\s*\(/i.test(sql)) {
      readCount++
      emit({ kind: 'count-complete', readCount, pid, isolation: connection.isolation, inTransaction: connection.inTransaction, sql })
      if (readCount === 1) firstPid = pid
      if (readCount === 2) {
        armed = false
        targetPid = pid
        observing = true
        paused = true
        await new Promise<void>((resume: () => void): void => {
          // Bound a broken orchestration to twenty seconds; a timeout is explicit test failure.
          const timer = setTimeout((): void => {
            releaseGate = undefined
            paused = false
            emit({ kind: 'gate-timeout' })
            resume()
          }, 20000)
          releaseGate = (): void => {
            clearTimeout(timer)
            releaseGate = undefined
            paused = false
            resume()
          }
          emit({ kind: 'paused', pid, firstPid, readCount, isolation: connection.isolation, inTransaction: connection.inTransaction })
        })
      }
    }
    if (observing && pid === targetPid && sql.includes('"User"') && sql.includes('"Appeal"') && /\bCOUNT\s*\(/i.test(sql)) {
      emit({ kind: 'operator-read-complete', pid, isolation: connection.isolation, inTransaction: connection.inTransaction, sql })
    }
    if (upper === 'COMMIT' || upper === 'ROLLBACK') {
      if (observing && pid === targetPid) {
        emit({ kind: 'snapshot-end', pid, operation: upper, isolation: connection.isolation })
        observing = false
      }
      connection.inTransaction = false
      connection.isolation = 'unspecified'
    }
    return value
  })
}

process.on('message', (value: unknown): void => {
  const message = record(value)
  if (message?.kind === 'arm') {
    if (paused || armed) {
      emit({ kind: 'gate-error', reason: 'Gate already active' })
      return
    }
    armed = true
    readCount = 0
    firstPid = null
    targetPid = null
    observing = false
    emit({ kind: 'armed' })
  } else if (message?.kind === 'release') {
    releaseGate?.()
    emit({ kind: 'released' })
  }
})
process.on('disconnect', (): void => { releaseGate?.() })

// Real compiled entry point, AppModule, SessionGuard, Prisma and PostgreSQL; no data mocks.
apiRequire(resolve(apiRoot, 'dist/main.js'))
