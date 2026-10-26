import { strict as assert } from 'node:assert'
import { createHash, randomUUID } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync, type Dirent } from 'node:fs'
import { resolve, relative } from 'node:path'
import { createRequire } from 'node:module'
import { spawn, type ChildProcess } from 'node:child_process'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'
import type { User, Appeal, AppealStatus, Permissions, UserRole } from '../../apps/api/src/generated/prisma/client'
import type { PrismaService } from '../../apps/api/src/prisma/prisma.service'

type Json = Record<string, unknown>
type Check = { name: string; result: 'PASS' | 'FAIL'; detail?: string }
type HttpResult = { status: number; body: unknown; cookie: string }
type Operator = { id: number; name: string; appealsCount: number }
type Summary = { countActiveAppeals: number; unassignedAppealsCount: number; operators: Operator[] }
type SqlClient = {
  connect(): Promise<void>
  end(): Promise<void>
  query(sql: string, values?: unknown[]): Promise<{ rows: Json[]; rowCount: number | null }>
}

const apiRoot = resolve(__dirname, '../../apps/api')
const repoRoot = resolve(apiRoot, '../..')
const apiRequire = createRequire(resolve(apiRoot, 'package.json'))
const { Client } = apiRequire('pg') as { Client: new (options: { connectionString: string; connectionTimeoutMillis: number }) => SqlClient }
const { parse } = apiRequire('dotenv') as { parse(value: Buffer): Record<string, string> }
const { hash } = apiRequire('argon2') as { hash(value: string): Promise<string> }
const databaseName = `ops018_validation_${randomUUID().replaceAll('-', '')}`
const sourceUrl = new URL(parse(readFileSync(resolve(apiRoot, '.env'))).DATABASE_URL)
assert(['localhost', '127.0.0.1', '[::1]'].includes(sourceUrl.hostname), 'Local PostgreSQL only')
assert(/^ops018_validation_[a-f0-9]{32}$/.test(databaseName))
const adminUrl = new URL(sourceUrl)
adminUrl.pathname = '/postgres'
const testUrl = new URL(sourceUrl)
testUrl.pathname = `/${databaseName}`
assert.notEqual(testUrl.pathname, sourceUrl.pathname)
const admin = new Client({ connectionString: adminUrl.href, connectionTimeoutMillis: 5000 })
const sql = new Client({ connectionString: testUrl.href, connectionTimeoutMillis: 5000 })
let adminConnected = false
let sqlConnected = false
let created = false
let prisma: PrismaService | undefined
let server: ChildProcess | undefined
let baseUrl = ''
const checks: Check[] = []
const ipc: Json[] = []
const password = randomUUID()
const report: Json = {
  date: '2026-10-26',
  baseCommit: '5e5455b5666ef85e0740e175e3a6a3100419965f',
  sourceState: 'Uncommitted OPS-018 implementation; exact source and runtime fingerprints below',
  method: 'Freshly compiled actual dist/main.js; real HTTP login/session guard/services/Prisma/PostgreSQL. Process-scoped pg driver barrier for deterministic concurrency only; no SQL, data or result replacement',
  isolation: 'Unique disposable local DB; working DB is neither queried nor mutated. Admin connection targets postgres only',
  migrations: 'Repository migration SQL in filename order, no Prisma deployment ledger simulation',
  buildEvidence: 'Parent executed node node_modules/typescript/bin/tsc -p tsconfig.build.json successfully immediately before this run preparation',
  priorAttempt: { report: 'OPS-018-http-validation-attempt-1.json', passed: 30, failed: 0, limitation: 'Assertions passed, but positive-case report retained mutable expected-state reference later changed by negative-control fixture creation. Corrected by cloning report state; mentor-owned evidence bug, not application defect. First DB cleanup verified.' },
  checks,
}

function object(value: unknown): Json {
  assert(value !== null && typeof value === 'object' && !Array.isArray(value))
  return value as Json
}
function db(): PrismaService { assert(prisma); return prisma }
function safeError(error: unknown): string {
  return (error instanceof Error ? error.message : String(error)).replaceAll(sourceUrl.href, '[redacted]').replaceAll(testUrl.href, '[redacted]')
}
async function check(name: string, action: () => Promise<void>): Promise<void> {
  try { await action(); checks.push({ name, result: 'PASS' }) }
  catch (error: unknown) {
    const detail = safeError(error)
    checks.push({ name, result: 'FAIL', detail })
    process.stderr.write(`FAIL ${name}: ${detail}\n`)
  }
}
function sourceFiles(): string[] {
  function walk(folder: string): string[] {
    return readdirSync(folder, { withFileTypes: true }).flatMap((entry: Dirent): string[] => {
      const path = resolve(folder, entry.name)
      return entry.isDirectory() ? walk(path) : entry.name.endsWith('.ts') ? [relative(apiRoot, path).replaceAll('\\', '/')] : []
    })
  }
  return [...walk(resolve(apiRoot, 'src')), 'prisma/schema.prisma', 'package.json', 'pnpm-lock.yaml', 'tsconfig.json', 'tsconfig.build.json'].sort()
}
function fingerprint(files: string[]): string {
  const digest = createHash('sha256')
  for (const file of files) digest.update(file).update(readFileSync(resolve(apiRoot, file)))
  return digest.digest('hex')
}
async function http(method: string, path: string, cookie = '', body?: unknown): Promise<HttpResult> {
  const response = await fetch(`${baseUrl}${path}`, {
    method, headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    // Thirty seconds accommodates the controlled concurrency gate, not an unbounded wait.
    signal: AbortSignal.timeout(30000),
  })
  const text = await response.text()
  return { status: response.status, body: text ? JSON.parse(text) as unknown : null, cookie: response.headers.get('set-cookie')?.split(';')[0] ?? '' }
}
function summary(value: unknown): Summary {
  const root = object(value)
  assert.deepEqual(Object.keys(root).sort(), ['countActiveAppeals', 'operators', 'unassignedAppealsCount'])
  assert.equal(typeof root.countActiveAppeals, 'number')
  assert.equal(typeof root.unassignedAppealsCount, 'number')
  assert(Array.isArray(root.operators))
  const operators = root.operators.map((item: unknown): Operator => {
    const row = object(item)
    assert.deepEqual(Object.keys(row).sort(), ['appealsCount', 'id', 'name'])
    assert.equal(typeof row.id, 'number'); assert.equal(typeof row.name, 'string'); assert.equal(typeof row.appealsCount, 'number')
    assert(Number.isInteger(row.appealsCount) && Number(row.appealsCount) >= 0)
    return { id: Number(row.id), name: String(row.name), appealsCount: Number(row.appealsCount) }
  })
  const result = { countActiveAppeals: Number(root.countActiveAppeals), unassignedAppealsCount: Number(root.unassignedAppealsCount), operators }
  assert(Number.isInteger(result.countActiveAppeals) && result.countActiveAppeals >= 0)
  assert(Number.isInteger(result.unassignedAppealsCount) && result.unassignedAppealsCount >= 0)
  assert.equal(result.countActiveAppeals, result.unassignedAppealsCount + operators.reduce((sum: number, row: Operator): number => sum + row.appealsCount, 0))
  assert.deepEqual(operators.map((row: Operator): number => row.id), operators.map((row: Operator): number => row.id).sort((a: number, b: number): number => a - b))
  return result
}
async function workload(cookie: string): Promise<Summary> {
  const response = await http('GET', '/appeals/workload', cookie)
  assert.equal(response.status, 200)
  return summary(response.body)
}
async function login(user: User): Promise<string> {
  const response = await http('POST', '/auth/login', '', { email: user.email, password })
  assert.equal(response.status, 200)
  assert.deepEqual(response.body, { id: user.id, name: user.name, role: user.role })
  assert(response.cookie.startsWith('sid='))
  return response.cookie
}
function waitFor(kind: string): Promise<Json> {
  assert(server)
  const child = server
  return new Promise<Json>((resolveMessage: (value: Json) => void, reject: (error: Error) => void): void => {
    const timer = setTimeout((): void => { child.off('message', receive); reject(new Error(`Timed out waiting for IPC ${kind}`)) }, 15000)
    function receive(value: unknown): void {
      const message = object(value)
      if (message.kind === kind || message.kind === 'gate-error' || message.kind === 'gate-timeout') {
        clearTimeout(timer); child.off('message', receive)
        if (message.kind !== kind) reject(new Error(`Concurrency gate failure: ${String(message.kind)}`))
        else resolveMessage(message)
      }
    }
    child.on('message', receive)
  })
}
async function unusedPort(): Promise<number> {
  const listener = createServer()
  await new Promise<void>((done: () => void, reject: (error: Error) => void): void => {
    listener.once('error', reject); listener.listen(0, '127.0.0.1', done)
  })
  const address = listener.address(); assert(address && typeof address !== 'string')
  await new Promise<void>((done: () => void, reject: (error: Error) => void): void => { listener.close((error?: Error): void => error ? reject(error) : done()) })
  return address.port
}
async function start(): Promise<void> {
  const port = await unusedPort()
  baseUrl = `http://127.0.0.1:${port}`
  server = spawn(process.execPath, ['-r', apiRequire.resolve('ts-node/register'), resolve(__dirname, 'OPS-018-probe-server.ts')], {
    cwd: apiRoot, windowsHide: true,
    env: { ...process.env, DATABASE_URL: testUrl.href, PORT: String(port), SESSION_COOKIE_SECURE: 'false', TS_NODE_PROJECT: resolve(apiRoot, 'tsconfig.json') },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
  })
  server.stdout?.resume(); server.stderr?.resume()
  server.on('message', (value: unknown): void => { ipc.push(object(value)) })
  let spawnError: Error | undefined
  server.once('error', (error: Error): void => { spawnError = error })
  report.apiPid = server.pid
  // Bound startup to thirty seconds and prove readiness through a protected HTTP route.
  const deadline = Date.now() + 30000
  let lastError = 'No response'
  while (Date.now() < deadline) {
    if (spawnError) throw spawnError
    if (server.exitCode !== null) throw new Error(`Probe server exited during startup (${server.exitCode})`)
    try {
      assert.equal((await http('GET', '/auth/me')).status, 401)
      return
    } catch (error: unknown) { lastError = safeError(error); await delay(100) }
  }
  throw new Error(`Readiness failed: ${lastError}`)
}
async function stop(): Promise<void> {
  const child = server
  if (!child) return
  if (child.connected) child.send({ kind: 'release' })
  if (child.exitCode === null && child.signalCode === null) {
    await new Promise<void>((done: () => void, reject: (error: Error) => void): void => {
      const timer = setTimeout((): void => reject(new Error('Owned API did not stop')), 10000)
      child.once('exit', (): void => { clearTimeout(timer); done() })
      child.kill()
    })
  }
  server = undefined
}
function reassigned(before: Summary, from: number | null, to: number | null): Summary {
  const result = structuredClone(before)
  if (from === null) result.unassignedAppealsCount--
  else result.operators.find((row: Operator): boolean => row.id === from)!.appealsCount--
  if (to === null) result.unassignedAppealsCount++
  else result.operators.find((row: Operator): boolean => row.id === to)!.appealsCount++
  return result
}

async function main(): Promise<void> {
  const files = sourceFiles()
  report.sourceFiles = files
  report.sourceSha256 = fingerprint(files)
  report.harnessSha256 = createHash('sha256').update(readFileSync(__filename)).digest('hex')
  report.probeServerSha256 = createHash('sha256').update(readFileSync(resolve(__dirname, 'OPS-018-probe-server.ts'))).digest('hex')
  report.runtimeDependencies = Object.fromEntries(['@nestjs/common', '@nestjs/core', '@prisma/client', '@prisma/adapter-pg', 'pg', 'argon2', 'class-validator', 'class-transformer'].map((name: string): [string, string] => [name, String(object(JSON.parse(readFileSync(resolve(apiRoot, 'node_modules', name, 'package.json'), 'utf8'))).version)]))
  report.runtimeArtifacts = Object.fromEntries(['main.js', 'appeals/appeals.controller.js', 'appeals/appeals.service.js', 'appeals/appeals.repository.js'].map((file: string): [string, string] => [file, createHash('sha256').update(readFileSync(resolve(apiRoot, 'dist', file))).digest('hex')]))
  await admin.connect(); adminConnected = true
  await admin.query(`CREATE DATABASE "${databaseName}"`); created = true
  await sql.connect(); sqlConnected = true
  assert.equal((await sql.query('SELECT current_database() AS name')).rows[0].name, databaseName)
  const migrations = readdirSync(resolve(apiRoot, 'prisma/migrations')).filter((name: string): boolean => /^\d/.test(name)).sort()
  for (const migration of migrations) await sql.query(readFileSync(resolve(apiRoot, 'prisma/migrations', migration, 'migration.sql'), 'utf8'))
  process.env.DATABASE_URL = testUrl.href
  const { PrismaService: FixturePrisma } = apiRequire('./dist/prisma/prisma.service.js') as typeof import('../../apps/api/src/prisma/prisma.service')
  const { AppealsRepository } = apiRequire('./dist/appeals/appeals.repository.js') as typeof import('../../apps/api/src/appeals/appeals.repository')
  prisma = new FixturePrisma()
  assert.equal((await db().$queryRaw<Array<{ name: string }>>`SELECT current_database() AS name`)[0].name, databaseName)
  await check('Actual repository: no operators and no appeals gives empty snapshot', async (): Promise<void> => {
    assert.deepEqual(await new AppealsRepository(db()).getWorkloadSnapshot(), { countActiveAppeals: 0, unassignedAppealsCount: 0, operatorRows: [] })
  })
  report.noOperatorLimit = 'No real authorized OPERATOR HTTP caller can coexist with zero operators; actual empty-DB repository and earlier isolated service mapping cover that unreachable HTTP precondition separately'
  const passwordHash = await hash(password)
  async function user(id: number, name: string, role: UserRole, permissions: Permissions[] = []): Promise<User> {
    return db().user.create({ data: { id, name, role, permissions, email: `${id}@ops018.invalid`, passwordHash } })
  }
  const a = await user(101, 'Client A', 'CLIENT')
  const b = await user(102, 'Client B', 'CLIENT')
  const adversarial = await user(103, 'Client with management flag', 'CLIENT', ['CAN_MANAGE_APPEALS'])
  // Explicit ids and insertion order differ, so sorting is checked against a nontrivial oracle.
  const opA = await user(41, 'Same name', 'OPERATOR')
  const opB = await user(7, 'Same name', 'OPERATOR')
  const manager = await user(83, 'Lead', 'OPERATOR', ['CAN_MANAGE_APPEALS'])
  const zero = await user(19, 'Zero active', 'OPERATOR')
  const users = [a, b, adversarial, opA, opB, manager, zero]
  const cookies = new Map<number, string>()
  await start()
  for (const item of users) await check(`Real login: ${item.role} ${item.id}`, async (): Promise<void> => { cookies.set(item.id, await login(item)) })
  function cookie(item: User): string { const value = cookies.get(item.id); assert(value, `Missing login fixture ${item.id}`); return value }
  const empty: Summary = { countActiveAppeals: 0, unassignedAppealsCount: 0, operators: [
    { id: opB.id, name: opB.name, appealsCount: 0 }, { id: zero.id, name: zero.name, appealsCount: 0 },
    { id: opA.id, name: opA.name, appealsCount: 0 }, { id: manager.id, name: manager.name, appealsCount: 0 },
  ] }
  await check('HTTP no appeals: every operator present in exact ascending order with zero counts', async (): Promise<void> => { assert.deepEqual(await workload(cookie(manager)), empty) })
  for (const denied of [a, b, adversarial, opA, opB, zero]) {
    await check(`HTTP denied caller ${denied.id} (${denied.role}) gets safe 403`, async (): Promise<void> => {
      const response = await http('GET', '/appeals/workload', cookie(denied))
      assert.equal(response.status, 403)
      assert.deepEqual(response.body, { message: 'Workload reading is forbidden', error: 'Forbidden', statusCode: 403 })
    })
  }
  // A day exceeds both idle and absolute configured session lifetimes.
  const expired = await db().session.create({ data: { id: randomUUID(), userId: manager.id, createdAt: new Date(Date.now() - 86400000), lastActivityAt: new Date(Date.now() - 86400000) } })
  for (const [label, sessionCookie] of [['missing', ''], ['invalid', 'sid=invalid-session'], ['expired', `sid=${expired.id}`]]) {
    await check(`Real SessionGuard rejects ${label} session with 401`, async (): Promise<void> => { assert.equal((await http('GET', '/appeals/workload', sessionCookie)).status, 401) })
  }
  async function appeal(client: User, status: AppealStatus, ownerId: number | null = null): Promise<Appeal> {
    return db().appeal.create({ data: { clientId: client.id, status, ownerId, title: `Fixture ${status}`, description: 'Synthetic workload fixture', ...(status === 'CLOSED' ? { outcome: 'Historical outcome', closedAt: new Date() } : {}) } })
  }
  const target = await appeal(a, 'NEW')
  await appeal(a, 'NEW'); await appeal(b, 'NEW')
  await appeal(a, 'IN_PROGRESS', opA.id); await appeal(b, 'IN_PROGRESS', opA.id)
  await appeal(b, 'IN_PROGRESS', opB.id); await appeal(a, 'IN_PROGRESS', manager.id)
  const closed = await appeal(a, 'CLOSED', opA.id)
  await appeal(b, 'CLOSED', zero.id)
  report.fixturePreconditions = { operatorIdsInInsertionOrder: [41, 7, 83, 19], expectedOrder: [7, 19, 41, 83], duplicateOperatorNames: opA.name === opB.name, zeroLoadOperatorHasClosedAppeal: true, customersDistinct: a.id !== b.id, adversarialClientHasManagementFlag: true }
  let expected: Summary = { countActiveAppeals: 7, unassignedAppealsCount: 3, operators: [
    { id: opB.id, name: opB.name, appealsCount: 1 }, { id: zero.id, name: zero.name, appealsCount: 0 },
    { id: opA.id, name: opA.name, appealsCount: 2 }, { id: manager.id, name: manager.name, appealsCount: 1 },
  ] }
  const businessBefore = await db().appeal.findMany({ orderBy: { id: 'asc' } })
  await check('Exact mixed-state workload, duplicate names, manager load, zeros and safe projection', async (): Promise<void> => { assert.deepEqual(await workload(cookie(manager)), expected); report.initialSummary = expected })
  await check('Workload GET does not mutate appeal business records', async (): Promise<void> => { assert.deepEqual(await db().appeal.findMany({ orderBy: { id: 'asc' } }), businessBefore) })
  await check('Existing detail route and id validation preserved', async (): Promise<void> => {
    assert.equal((await http('GET', `/appeals/${target.id}`, cookie(manager))).status, 200)
    assert.equal((await http('GET', '/appeals/1e0', cookie(manager))).status, 400)
    assert.equal((await http('GET', '/appeals/2147483648', cookie(manager))).status, 400)
    assert.equal((await http('GET', '/appeals/abc')).status, 401)
  })
  await check('Multiple progress updates do not inflate workload; history retained', async (): Promise<void> => {
    for (const message of ['One', 'Two', 'Three']) assert.equal((await http('POST', `/appeals/${target.id}/updateMessage`, cookie(opA), { message })).status, 201)
    assert.deepEqual(await workload(cookie(manager)), expected)
    const history = await http('GET', `/appeals/${target.id}/updateMessages`, cookie(a))
    assert.equal(history.status, 200); assert(Array.isArray(history.body)); assert.equal(history.body.length, 3)
  })
  await check('Assignment reflects exact next summary and valid status/owner', async (): Promise<void> => {
    assert.equal((await http('PATCH', `/appeals/${target.id}/owner`, cookie(manager), { ownerId: opA.id })).status, 200)
    expected = reassigned(expected, null, opA.id)
    assert.deepEqual(await workload(cookie(manager)), expected)
    const stored = await db().appeal.findUniqueOrThrow({ where: { id: target.id } }); assert.equal(stored.status, 'IN_PROGRESS'); assert.equal(stored.ownerId, opA.id)
  })
  await check('Reassignment moves exactly one count between operators', async (): Promise<void> => {
    assert.equal((await http('PATCH', `/appeals/${target.id}/owner`, cookie(manager), { ownerId: opB.id })).status, 200)
    expected = reassigned(expected, opA.id, opB.id)
    assert.deepEqual(await workload(cookie(manager)), expected)
  })
  await check('Closing removes the active count, preserves history and historical outcome', async (): Promise<void> => {
    assert.equal((await http('PATCH', `/appeals/${target.id}/close`, cookie(opB), { outcome: 'Resolved by fixture' })).status, 200)
    expected.countActiveAppeals--; expected.operators.find((row: Operator): boolean => row.id === opB.id)!.appealsCount--
    assert.deepEqual(await workload(cookie(manager)), expected)
    const stored = await db().appeal.findUniqueOrThrow({ where: { id: target.id } }); assert.equal(stored.status, 'CLOSED'); assert.equal(stored.outcome, 'Resolved by fixture')
    const history = await http('GET', `/appeals/${target.id}/updateMessages`, cookie(a)); assert.equal(history.status, 200); assert(Array.isArray(history.body)); assert.equal(history.body.length, 3)
    assert.equal((await db().appeal.findUniqueOrThrow({ where: { id: closed.id } })).outcome, 'Historical outcome')
  })
  const race = await appeal(a, 'NEW')
  expected.countActiveAppeals++; expected.unassignedAppealsCount++
  await check('Before concurrency window: exact known baseline', async (): Promise<void> => { assert.deepEqual(await workload(cookie(manager)), expected) })
  await check('Actual HTTP/Prisma RepeatableRead survives assignment between second and third reads', async (): Promise<void> => {
    assert(server?.connected)
    const before = structuredClone(expected)
    const messageStart = ipc.length
    const armed = waitFor('armed'); server.send({ kind: 'arm' }); await armed
    const paused = waitFor('paused')
    const request = http('GET', '/appeals/workload', cookie(manager))
    try {
      const gate = await paused
      assert.equal(gate.readCount, 2); assert.equal(gate.isolation, 'RepeatableRead'); assert.equal(gate.inTransaction, true)
      assert.equal(gate.firstPid, gate.pid); assert.equal(typeof gate.pid, 'number')
      const activity = await admin.query('SELECT state, datname FROM pg_stat_activity WHERE pid = $1', [gate.pid])
      assert.equal(activity.rows[0].datname, databaseName); assert.equal(activity.rows[0].state, 'idle in transaction')
      const assignment = await http('PATCH', `/appeals/${race.id}/owner`, cookie(manager), { ownerId: opA.id })
      assert.equal(assignment.status, 200)
      const committed = await db().appeal.findUniqueOrThrow({ where: { id: race.id } })
      assert.equal(committed.status, 'IN_PROGRESS'); assert.equal(committed.ownerId, opA.id)
      const writes = ipc.slice(messageStart).filter((item: Json): boolean => item.kind === 'concurrent-write-start')
      assert(writes.length > 0); assert(writes.every((item: Json): boolean => item.pid !== gate.pid))
      server.send({ kind: 'release' })
      const response = await request
      assert.equal(response.status, 200); assert.deepEqual(summary(response.body), before)
      expected = reassigned(expected, null, opA.id)
      assert.deepEqual(await workload(cookie(manager)), expected)
      const events = ipc.slice(messageStart)
      const operatorRead = events.find((item: Json): boolean => item.kind === 'operator-read-complete')
      assert(operatorRead); assert.equal(operatorRead.pid, gate.pid); assert.equal(operatorRead.isolation, 'RepeatableRead')
      assert(events.some((item: Json): boolean => item.kind === 'snapshot-end' && item.operation === 'COMMIT' && item.pid === gate.pid))
      assert(!events.some((item: Json): boolean => item.kind === 'gate-timeout'))
      report.concurrency = { orchestration: 'Pause after actual second COUNT driver result, assign via separate real HTTP request, verify committed parent state through another Prisma connection, release, compare old snapshot and next exact response', gate, backendActivity: activity.rows[0], events, snapshotBefore: before, responseDuringAssignment: response.body, responseAfterCommit: structuredClone(expected), assignmentCommittedBeforeRelease: true }
    } finally {
      if (server?.connected) server.send({ kind: 'release' })
      await request
    }
  })
  const control = await appeal(b, 'NEW')
  expected.countActiveAppeals++; expected.unassignedAppealsCount++
  await check('ReadCommitted negative control reproduces original mixed-read defect', async (): Promise<void> => {
    const connection = new Client({ connectionString: testUrl.href, connectionTimeoutMillis: 5000 })
    await connection.connect()
    try {
      await connection.query('BEGIN ISOLATION LEVEL READ COMMITTED')
      const total = Number((await connection.query('SELECT count(*)::int AS count FROM "Appeal" WHERE status IN (\'NEW\', \'IN_PROGRESS\')')).rows[0].count)
      const unassigned = Number((await connection.query('SELECT count(*)::int AS count FROM "Appeal" WHERE status = \'NEW\'')).rows[0].count)
      assert.equal(total, expected.countActiveAppeals); assert.equal(unassigned, expected.unassignedAppealsCount)
      assert.equal((await http('PATCH', `/appeals/${control.id}/owner`, cookie(manager), { ownerId: opB.id })).status, 200)
      const rows = await connection.query('SELECT u.id, u.name, count(a.id)::int AS "appealsCount" FROM "User" u LEFT JOIN "Appeal" a ON a."ownerId" = u.id AND a.status = \'IN_PROGRESS\' WHERE u.role = \'OPERATOR\' GROUP BY u.id, u.name ORDER BY u.id ASC')
      const componentSum = unassigned + rows.rows.reduce((sum: number, row: Json): number => sum + Number(row.appealsCount), 0)
      assert.equal(componentSum, total + 1)
      await connection.query('COMMIT')
      expected = reassigned(expected, null, opB.id)
      assert.deepEqual(await workload(cookie(manager)), expected)
      report.negativeControl = { method: 'Separate explicit ReadCommitted SQL transaction with two counts before an actual HTTP assignment and operator aggregate after it; application transaction settings unchanged', total, unassigned, operators: rows.rows, componentSum, expectedViolation: componentSum !== total }
    } finally { await connection.end() }
  })
  await check('Protected read logout regression', async (): Promise<void> => {
    const freshCookie = await login(manager)
    assert.equal((await http('POST', '/auth/logout', freshCookie)).status, 204)
    assert.equal((await http('GET', '/appeals/workload', freshCookie)).status, 401)
  })
  await check('Source identity unchanged throughout execution', async (): Promise<void> => { assert.equal(fingerprint(files), report.sourceSha256) })
}

async function run(): Promise<void> {
  try { await main() }
  catch (error: unknown) { checks.push({ name: 'Harness setup/execution', result: 'FAIL', detail: safeError(error) }); process.stderr.write(`Harness failed: ${safeError(error)}\n`) }
  finally {
    async function cleanup(name: string, action: () => Promise<void>): Promise<void> {
      try { await action() } catch (error: unknown) { checks.push({ name, result: 'FAIL', detail: safeError(error) }) }
    }
    await cleanup('Cleanup owned API', stop)
    if (prisma) await cleanup('Cleanup fixture Prisma connection', async (): Promise<void> => { await db().$disconnect() })
    if (sqlConnected) await cleanup('Cleanup fixture SQL connection', async (): Promise<void> => { await sql.end() })
    if (created) await cleanup('Drop exact disposable database and verify absence', async (): Promise<void> => {
      assert(/^ops018_validation_[a-f0-9]{32}$/.test(databaseName)); assert.notEqual(`/${databaseName}`, sourceUrl.pathname)
      await admin.query(`DROP DATABASE "${databaseName}"`)
      assert.equal((await admin.query('SELECT datname FROM pg_database WHERE datname = $1', [databaseName])).rows.length, 0)
      report.cleanup = 'Owned API stopped, fixture connections closed, exact disposable database dropped and absence verified'
    })
    if (adminConnected) await cleanup('Cleanup admin connection', async (): Promise<void> => { await admin.end() })
    if (!report.cleanup) { report.cleanup = 'Not fully confirmed'; report.cleanupDatabase = databaseName }
    const failed = checks.filter((item: Check): boolean => item.result === 'FAIL').length
    report.summary = { passed: checks.length - failed, failed }
    report.exitCode = failed ? 1 : 0
    writeFileSync(resolve(repoRoot, 'work/tickets/OPS-018-http-validation.json'), `${JSON.stringify(report, null, 2)}\n`)
    process.stdout.write(`${JSON.stringify(report.summary)}; ${String(report.cleanup)}\n`)
    process.exitCode = failed ? 1 : 0
  }
}

void run()
