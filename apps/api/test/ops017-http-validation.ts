import { strict as assert } from 'node:assert'
import { createHash, randomUUID } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'
import { hash } from 'argon2'
import { parse } from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import type { Appeal, User } from '../src/generated/prisma/client'

type JsonObject = Record<string, unknown>
type HttpResult = { status: number; body: unknown; cookie: string }
type CaseResult = { name: string; result: 'PASS' | 'FAIL'; detail?: string }
type SqlConnection = {
  connect(): Promise<void>
  end(): Promise<void>
  query(sql: string, values?: unknown[]): Promise<{ rows: JsonObject[] }>
}
const { Client } = require('pg') as {
  Client: new (options: { connectionString: string; connectionTimeoutMillis: number }) => SqlConnection
}

const apiRoot = resolve(__dirname, '..')
const repoRoot = resolve(apiRoot, '../..')
const reportPath = resolve(repoRoot, 'work/tickets/OPS-017-http-validation.json')
const databaseName = `ops017_validation_${randomUUID().replaceAll('-', '')}`
const sourceUrl = new URL(parse(readFileSync(resolve(apiRoot, '.env'))).DATABASE_URL)
assert(['localhost', '127.0.0.1', '[::1]'].includes(sourceUrl.hostname), 'Local PostgreSQL only')
const adminUrl = new URL(sourceUrl)
adminUrl.pathname = '/postgres'
const testUrl = new URL(sourceUrl)
testUrl.pathname = `/${databaseName}`
assert(/^ops017_validation_[a-f0-9]{32}$/.test(databaseName))
assert.notEqual(testUrl.pathname, sourceUrl.pathname)

// All mutations use the generated database; the admin connection only creates/drops that exact name.
const admin = new Client({ connectionString: adminUrl.href, connectionTimeoutMillis: 5000 })
const sql = new Client({ connectionString: testUrl.href, connectionTimeoutMillis: 5000 })
let prisma: PrismaClient | undefined
let server: ChildProcess | undefined
let baseUrl = ''
let databaseCreated = false
let sqlConnected = false
let adminConnected = false
const checks: CaseResult[] = []
const processIds: number[] = []
const report: JsonObject = {
  date: '2026-10-26',
  sourceCommit: '13e482afe098ba42bb425c11ba050e01bbc8d910',
  sourceState: 'Uncommitted fix over sourceCommit: global primitive transformation disabled; search transformation preserved locally. Exact source snapshot below.',
  method: 'Compiled dist/main.js in owned child processes; real HTTP, login, SessionGuard, Prisma and PostgreSQL; no mocks',
  isolation: 'Unique disposable local database; working database is never queried or mutated',
  migrationMethod: 'Execute repository migration SQL in filename order, with existing fixtures before OPS-017 migration; Prisma migration deployment ledger is not simulated',
  checks,
  processIds,
}

function object(value: unknown): JsonObject {
  assert(value !== null && typeof value === 'object' && !Array.isArray(value))
  return value as JsonObject
}

function array(value: unknown): JsonObject[] {
  assert(Array.isArray(value))
  return value.map((item: unknown): JsonObject => object(item))
}

function db(): PrismaClient {
  assert(prisma)
  return prisma
}

async function check(name: string, action: () => Promise<void>): Promise<void> {
  try {
    await action()
    checks.push({ name, result: 'PASS' })
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error)
    checks.push({ name, result: 'FAIL', detail })
    process.stderr.write(`FAIL: ${name}: ${detail}\n`)
  }
}

async function http(method: string, path: string, cookie = '', body?: unknown): Promise<HttpResult> {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    // Bound requests so a failed server cannot leave the validation waiting indefinitely.
    signal: AbortSignal.timeout(10000),
  })
  const text = await response.text()
  return {
    status: response.status,
    body: text ? JSON.parse(text) as unknown : null,
    cookie: response.headers.get('set-cookie')?.split(';')[0] ?? '',
  }
}

async function history(id: number, cookie: string): Promise<JsonObject[]> {
  const response = await http('GET', `/appeals/${id}/updateMessages`, cookie)
  assert.equal(response.status, 200)
  return array(response.body)
}

async function databaseTime(): Promise<number> {
  const result = await sql.query('SELECT extract(epoch FROM clock_timestamp()) * 1000 AS milliseconds')
  return Number(result.rows[0].milliseconds)
}

async function unusedPort(): Promise<number> {
  const listener = createServer()
  await new Promise<void>((resolveListen: () => void, reject: (error: Error) => void): void => {
    listener.once('error', reject)
    listener.listen(0, '127.0.0.1', resolveListen)
  })
  const address = listener.address()
  assert(address && typeof address !== 'string')
  const port = address.port
  await new Promise<void>((resolveClose: () => void, reject: (error: Error) => void): void => {
    listener.close((error?: Error): void => error ? reject(error) : resolveClose())
  })
  return port
}

async function start(): Promise<void> {
  const port = await unusedPort()
  baseUrl = `http://127.0.0.1:${port}`
  server = spawn(process.execPath, ['dist/main.js'], {
    cwd: apiRoot,
    env: { ...process.env, DATABASE_URL: testUrl.href, PORT: String(port), SESSION_COOKIE_SECURE: 'false' },
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  // Drain logs without exposing connection strings or cookies in evidence.
  server.stdout?.resume()
  server.stderr?.resume()
  assert(server.pid)
  processIds.push(server.pid)
  let spawnError: Error | undefined
  server.once('error', (error: Error): void => { spawnError = error })
  // Thirty seconds bounds startup; readiness is an actual HTTP 401 from the protected route.
  const deadline = Date.now() + 30000
  let lastError = 'No HTTP response'
  while (Date.now() < deadline) {
    if (spawnError) throw spawnError
    if (server.exitCode !== null) throw new Error(`Owned API exited: ${server.exitCode}`)
    try {
      const response = await http('GET', '/auth/me')
      assert.equal(response.status, 401)
      return
    } catch (error: unknown) {
      lastError = error instanceof Error ? error.message : String(error)
      await delay(100)
    }
  }
  throw new Error(`API readiness timed out: ${lastError}`)
}

async function stop(): Promise<void> {
  const owned = server
  if (!owned) return
  if (owned.exitCode === null && owned.signalCode === null) {
    await new Promise<void>((resolveExit: () => void, reject: (error: Error) => void): void => {
      const timeout = setTimeout((): void => reject(new Error('Owned API did not stop')), 10000)
      owned.once('exit', (): void => { clearTimeout(timeout); resolveExit() })
      owned.kill()
    })
  }
  server = undefined
}

const password = randomUUID()
async function login(user: User): Promise<string> {
  const response = await http('POST', '/auth/login', '', { email: user.email, password })
  assert.equal(response.status, 200)
  assert.deepEqual(response.body, { id: user.id, name: user.name, role: user.role })
  assert(response.cookie.startsWith('sid='))
  return response.cookie
}

async function main(): Promise<void> {
  const sourceFiles = [
    'src/main.ts', 'src/app.module.ts', 'src/appeals/appeals.controller.ts',
    'src/appeals/appeals.service.ts', 'src/appeals/appeals.repository.ts',
    'src/appeals/dto/create-appeal-update-message.dto.ts',
    'src/auth/auth.controller.ts', 'src/auth/auth.service.ts', 'src/auth/auth.module.ts',
    'src/auth/session/session.guard.ts', 'src/auth/session/session.constants.ts',
    'src/auth/session/session-timeout.ts', 'src/auth/password.ts',
    'src/common/pipes/validate-positive-int32.pipe.ts', 'src/prisma/prisma.service.ts',
    'prisma/schema.prisma',
  ]
  const digest = createHash('sha256')
  for (const file of sourceFiles) digest.update(file).update(readFileSync(resolve(apiRoot, file)))
  report.sourceFiles = sourceFiles
  report.sourceSha256 = digest.digest('hex')
  report.harnessSha256 = createHash('sha256').update(readFileSync(__filename)).digest('hex')
  await admin.connect()
  adminConnected = true
  await admin.query(`CREATE DATABASE "${databaseName}"`)
  databaseCreated = true
  await sql.connect()
  sqlConnected = true
  assert.equal((await sql.query('SELECT current_database() AS name')).rows[0].name, databaseName)
  report.databaseClockMinusHostMs = Math.round(await databaseTime() - Date.now())

  const migrations = readdirSync(resolve(apiRoot, 'prisma/migrations'))
    .filter((name: string): boolean => /^\d/.test(name)).sort()
  const newMigration = '20261024121528_add_appeal_update_messages'
  assert.equal(migrations.at(-1), newMigration)
  for (const migration of migrations.filter((name: string): boolean => name !== newMigration)) {
    await sql.query(readFileSync(resolve(apiRoot, 'prisma/migrations', migration, 'migration.sql'), 'utf8'))
  }
  prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: testUrl.href }) })
  const passwordHash = await hash(password)
  const users: User[] = []
  for (const [name, role, permissions] of [
    ['Client A', 'CLIENT', []], ['Client B', 'CLIENT', []],
    ['Operator', 'OPERATOR', []], ['Manager', 'OPERATOR', ['CAN_MANAGE_APPEALS']],
  ] as const) {
    users.push(await db().user.create({ data: {
      name, email: `${users.length}@ops017.invalid`, role, permissions: [...permissions], passwordHash,
    } }))
  }
  const [a, b, operator, manager] = users
  const parents: Appeal[] = []
  for (const client of [a, b]) {
    for (const status of ['NEW', 'IN_PROGRESS', 'CLOSED'] as const) {
      parents.push(await db().appeal.create({ data: {
        clientId: client.id, status, title: `${client.name} ${status}`, description: 'Existing fixture',
        ownerId: status === 'NEW' ? null : manager.id,
        ...(status === 'CLOSED' ? { outcome: 'Resolved fixture', closedAt: new Date() } : {}),
      } }))
    }
  }
  const existingUsers = await db().user.findMany({ orderBy: { id: 'asc' } })
  const existingAppeals = await db().appeal.findMany({ orderBy: { id: 'asc' } })
  await check('OPS-017 migration preserves all existing fixture users/appeals/relations', async (): Promise<void> => {
    await sql.query(readFileSync(resolve(apiRoot, 'prisma/migrations', newMigration, 'migration.sql'), 'utf8'))
    assert.deepEqual(await db().user.findMany({ orderBy: { id: 'asc' } }), existingUsers)
    assert.deepEqual(await db().appeal.findMany({ orderBy: { id: 'asc' } }), existingAppeals)
    assert.equal(await db().appealUpdateMessage.count(), 0)
  })
  await start()
  const cookies = new Map<number, string>()
  for (const user of users) {
    await check(`Real login and safe projection: ${user.name}`, async (): Promise<void> => {
      cookies.set(user.id, await login(user))
    })
  }
  function cookie(user: User): string {
    const value = cookies.get(user.id)
    assert(value, `Login precondition: ${user.name}`)
    return value
  }
  report.fixturePreconditions = {
    distinctCustomers: a.id !== b.id, operatorWithoutPermission: operator.permissions.length === 0,
    managerPermission: manager.permissions.includes('CAN_MANAGE_APPEALS'),
    parentStatuses: parents.map((parent: Appeal): string => parent.status),
    unassigned: parents[0].ownerId === null, otherAssigned: parents[1].ownerId !== operator.id,
  }
  for (const parent of parents) {
    const client = parent.clientId === a.id ? a : b
    for (const reader of [client, operator, manager]) {
      await check(`Existing appeal ${parent.id} readable after migration by ${reader.name}`, async (): Promise<void> => {
        const response = await http('GET', `/appeals/${parent.id}`, cookie(reader))
        assert.equal(response.status, 200)
        assert.equal(object(response.body).title, parent.title)
        assert.equal(object(response.body).status, parent.status)
      })
      await check(`Empty history ${parent.id}: ${reader.name}`, async (): Promise<void> => {
        assert.deepEqual(await history(parent.id, cookie(reader)), [])
      })
    }
  }
  for (const parent of parents) {
    for (const writer of [operator, manager]) {
      await check(`Publish/read ${writer.name} on ${parent.id} ${parent.status}`, async (): Promise<void> => {
        const before = await db().appeal.findUniqueOrThrow({ where: { id: parent.id } })
        const message = `Update ${parent.id} by ${writer.name}`
        const beforeTime = await databaseTime()
        const response = await http('POST', `/appeals/${parent.id}/updateMessage`, cookie(writer), { message: `  ${message} \n` })
        assert.equal(response.status, 201)
        const item = object(response.body)
        assert.deepEqual(Object.keys(item).sort(), ['author', 'createdAt', 'id', 'message'])
        assert.deepEqual(item.author, { name: writer.name })
        assert.equal(item.message, message)
        assert.equal(typeof item.id, 'number')
        const createdAt = Date.parse(String(item.createdAt))
        // PostgreSQL timestamp(3) rounds to milliseconds; use its own clock and allow that rounding.
        assert(createdAt >= beforeTime - 1 && createdAt <= await databaseTime() + 1)
        assert((await history(parent.id, cookie(parent.clientId === a.id ? a : b))).some((entry: JsonObject): boolean => entry.id === item.id))
        assert.deepEqual(await db().appeal.findUniqueOrThrow({ where: { id: parent.id } }), before)
      })
    }
  }
  const parent = parents[0]
  const missingId = 2147483647 // Largest valid int32; explicitly verify absence before using it.
  assert.equal(await db().appeal.findUnique({ where: { id: missingId } }), null)
  for (const client of [a, b]) {
    for (const foreign of parents.filter((item: Appeal): boolean => item.clientId !== client.id)) {
      await check(`Neutral foreign/missing 404: ${client.name}, parent ${foreign.id}`, async (): Promise<void> => {
        const foreignResponse = await http('GET', `/appeals/${foreign.id}/updateMessages`, cookie(client))
        const missingResponse = await http('GET', `/appeals/${missingId}/updateMessages`, cookie(client))
        assert.equal(foreignResponse.status, 404)
        assert.equal(missingResponse.status, 404)
        assert.deepEqual(foreignResponse.body, missingResponse.body)
      })
    }
    let firstForbidden: unknown
    for (const target of [parent.id, parents[3].id, missingId]) {
      await check(`Client POST denied before disclosure: ${client.name}, parent ${target}`, async (): Promise<void> => {
        const count = await db().appealUpdateMessage.count()
        const response = await http('POST', `/appeals/${target}/updateMessage`, cookie(client), { message: 'Forbidden' })
        assert.equal(response.status, 403)
        if (firstForbidden === undefined) firstForbidden = response.body
        else assert.deepEqual(response.body, firstForbidden)
        assert.equal(await db().appealUpdateMessage.count(), count)
      })
    }
  }
  for (const writer of [operator, manager]) {
    for (const method of ['GET', 'POST']) {
      await check(`Operator missing parent: ${writer.name}, ${method}`, async (): Promise<void> => {
        const response = await http(method, `/appeals/${missingId}/${method === 'POST' ? 'updateMessage' : 'updateMessages'}`, cookie(writer), method === 'POST' ? { message: 'Missing parent' } : undefined)
        assert.equal(response.status, 404)
      })
    }
  }
  for (const invalid of [{}, { message: null }, { message: 3 }, { message: true }, { message: {} }, { message: [] }, { message: '' }, { message: ' \n\t ' }, { message: 'x'.repeat(2001) }]) {
    await check(`Invalid text ${JSON.stringify(invalid).slice(0, 70)}`, async (): Promise<void> => {
      const before = await history(parent.id, cookie(operator))
      assert.equal((await http('POST', `/appeals/${parent.id}/updateMessage`, cookie(operator), invalid)).status, 400)
      assert.deepEqual(await history(parent.id, cookie(operator)), before)
    })
  }
  for (const message of ['x', 'x'.repeat(2000), 'one  two\nthree']) {
    await check(`Valid trimmed text length ${message.length}`, async (): Promise<void> => {
      const response = await http('POST', `/appeals/${parent.id}/updateMessage`, cookie(operator), { message: ` \t${message}\n ` })
      assert.equal(response.status, 201)
      assert.equal(object(response.body).message, message)
    })
  }
  await check('Forged author/time/id/parent ignored and other parent unchanged', async (): Promise<void> => {
    const otherBefore = await history(parents[3].id, cookie(manager))
    const beforeTime = await databaseTime()
    const response = await http('POST', `/appeals/${parent.id}/updateMessage`, cookie(operator), {
      message: 'Actual author', authorId: manager.id, author: { name: manager.name },
      createdAt: '1990-01-01T00:00:00.000Z', appealId: parents[3].id, id: missingId,
    })
    assert.equal(response.status, 201)
    const item = object(response.body)
    assert.deepEqual(item.author, { name: operator.name })
    assert.notEqual(item.id, missingId)
    assert(Date.parse(String(item.createdAt)) >= beforeTime - 1)
    assert(Date.parse(String(item.createdAt)) <= await databaseTime() + 1)
    const stored = await db().appealUpdateMessage.findUniqueOrThrow({ where: { id: Number(item.id) } })
    assert.equal(stored.authorId, operator.id)
    assert.equal(stored.appealId, parent.id)
    assert.deepEqual(await history(parents[3].id, cookie(manager)), otherBefore)
  })
  await check('Repeated identical submissions append distinct saved rows', async (): Promise<void> => {
    const before = await history(parent.id, cookie(operator))
    const ids: unknown[] = []
    for (const attempt of [1, 2]) {
      const response = await http('POST', `/appeals/${parent.id}/updateMessage`, cookie(operator), { message: 'Repeated update' })
      assert.equal(response.status, 201, `Attempt ${attempt}`)
      ids.push(object(response.body).id)
    }
    assert.notEqual(ids[0], ids[1])
    const after = await history(parent.id, cookie(operator))
    assert.equal(after.length, before.length + 2)
    assert.deepEqual(after.slice(0, before.length), before)
  })
  const invalidIds = ['abc', '1.5', '1.0', '1e2', '1e0', '0x1', '0', '-1', '2147483648', '9007199254740993']
  const beforeInvalidIds = await db().appealUpdateMessage.count()
  const unexpectedIdResponses: JsonObject[] = []
  report.unexpectedIdResponses = unexpectedIdResponses
  for (const user of users) {
    for (const id of invalidIds) {
      for (const method of ['GET', 'POST']) {
        await check(`Authenticated invalid id ${id}: ${user.name} ${method}`, async (): Promise<void> => {
          const response = await http(method, `/appeals/${id}/${method === 'POST' ? 'updateMessage' : 'updateMessages'}`, cookie(user), method === 'POST' ? { message: 'Valid' } : undefined)
          if (response.status !== 400) unexpectedIdResponses.push({ id, role: user.role, caller: user.name, method, status: response.status, body: response.body })
          assert.equal(response.status, 400)
        })
      }
    }
  }
  await check('Invalid-id requests do not insert any update', async (): Promise<void> => {
    assert.equal(await db().appealUpdateMessage.count(), beforeInvalidIds)
  })
  const expired = await db().session.create({ data: {
    id: randomUUID(), userId: operator.id,
    // One day exceeds both configured idle and absolute session limits.
    createdAt: new Date(Date.now() - 86400000), lastActivityAt: new Date(Date.now() - 86400000),
  } })
  for (const [label, sessionCookie] of [['missing', ''], ['invalid', 'sid=not-a-session'], ['expired', `sid=${expired.id}`]]) {
    for (const id of [String(parent.id), 'abc', '0', '2147483648']) {
      for (const method of ['GET', 'POST']) {
        await check(`Session ${label} before validation: ${method} ${id}`, async (): Promise<void> => {
          const response = await http(method, `/appeals/${id}/${method === 'POST' ? 'updateMessage' : 'updateMessages'}`, sessionCookie, method === 'POST' ? { message: null } : undefined)
          assert.equal(response.status, 401)
        })
      }
    }
  }
  await check('Oldest-first ordering with reverse insertion and tied timestamps', async (): Promise<void> => {
    const orderedParent = await db().appeal.create({ data: { clientId: a.id, status: 'NEW', title: 'Order fixture', description: 'Order fixture' } })
    const later = await db().appealUpdateMessage.create({ data: { appealId: orderedParent.id, authorId: operator.id, message: 'Later inserted first', createdAt: new Date('2026-01-02T00:00:00Z') } })
    const earlyA = await db().appealUpdateMessage.create({ data: { appealId: orderedParent.id, authorId: manager.id, message: 'Early tie A', createdAt: new Date('2026-01-01T00:00:00Z') } })
    const earlyB = await db().appealUpdateMessage.create({ data: { appealId: orderedParent.id, authorId: operator.id, message: 'Early tie B', createdAt: new Date('2026-01-01T00:00:00Z') } })
    for (const reader of [a, operator, manager]) {
      const result = await history(orderedParent.id, cookie(reader))
      assert.deepEqual(result.map((item: JsonObject): unknown => item.id), [earlyA.id, earlyB.id, later.id])
      assert.deepEqual(result.map((item: JsonObject): unknown => item.author), [{ name: manager.name }, { name: operator.name }, { name: operator.name }])
      for (const item of result) assert.deepEqual(Object.keys(item).sort(), ['author', 'createdAt', 'id', 'message'])
    }
  })
  await check('Original appeal business fields unchanged by all update requests', async (): Promise<void> => {
    for (const expected of existingAppeals) assert.deepEqual(await db().appeal.findUniqueOrThrow({ where: { id: expected.id } }), expected)
  })
  await check('Existing auth/create/read/list/assignment/close/logout flows', async (): Promise<void> => {
    const me = await http('GET', '/auth/me', cookie(a))
    assert.equal(me.status, 200)
    assert.deepEqual(me.body, { id: a.id, name: a.name, role: a.role })
    const created = await http('POST', '/appeals', cookie(a), { title: 'Regression', description: 'Regression check' })
    assert.equal(created.status, 201)
    const id = Number(object(created.body).id)
    assert.equal((await http('POST', '/appeals', cookie(operator), { title: 'Forbidden', description: 'Forbidden' })).status, 403)
    assert.equal((await http('GET', `/appeals/${id}`, cookie(a))).status, 200)
    assert.equal((await http('GET', `/appeals/${id}`, cookie(b))).status, 404)
    assert(array((await http('GET', '/appeals', cookie(a))).body).some((item: JsonObject): boolean => item.id === id))
    assert.equal((await http('PATCH', `/appeals/${id}/owner`, cookie(operator), { ownerId: operator.id })).status, 403)
    assert.equal((await http('PATCH', `/appeals/${id}/owner`, cookie(manager), { ownerId: operator.id })).status, 200)
    assert.equal((await http('PATCH', `/appeals/${id}/close`, cookie(manager), { outcome: 'Wrong owner' })).status, 403)
    const closed = await http('PATCH', `/appeals/${id}/close`, cookie(operator), { outcome: 'Resolved' })
    assert.equal(closed.status, 200)
    assert.equal(object(closed.body).status, 'CLOSED')
    const logoutCookie = await login(b)
    assert.equal((await http('POST', '/auth/logout', logoutCookie)).status, 204)
    assert.equal((await http('GET', '/auth/me', logoutCookie)).status, 401)
  })
  await check('Shared DTO transforms/whitelist and numeric-body validation preserved', async (): Promise<void> => {
    const loggedIn = await http('POST', '/auth/login', '', { email: `  ${a.email}  `, password, ignored: 'extra' })
    assert.equal(loggedIn.status, 200)
    assert.deepEqual(loggedIn.body, { id: a.id, name: a.name, role: a.role })
    const created = await http('POST', '/appeals', cookie(a), {
      title: '  Trim regression  ', description: '  Description regression  ',
      clientId: b.id, status: 'CLOSED', ignored: 'extra',
    })
    assert.equal(created.status, 201)
    const item = object(created.body)
    assert.equal(item.title, 'Trim regression')
    assert.equal(item.description, 'Description regression')
    assert.equal(item.status, 'NEW')
    const id = Number(item.id)
    assert.equal((await db().appeal.findUniqueOrThrow({ where: { id } })).clientId, a.id)
    assert.equal((await http('PATCH', `/appeals/${id}/owner`, cookie(manager), { ownerId: String(operator.id) })).status, 400)
    assert.equal((await http('PATCH', `/appeals/${id}/owner`, cookie(manager), { ownerId: operator.id, ignored: 'extra' })).status, 200)
    const closed = await http('PATCH', `/appeals/${id}/close`, cookie(operator), { outcome: '  Trimmed outcome  ', ignored: 'extra' })
    assert.equal(closed.status, 200)
    assert.equal(object(closed.body).outcome, 'Trimmed outcome')
  })
  for (const user of [a, operator]) {
    await check(`Search string conversion preserved locally: ${user.name}`, async (): Promise<void> => {
      const scalar = await http('GET', '/appeals?search=Regression', cookie(user))
      assert.equal(scalar.status, 200)
      for (const item of array(scalar.body)) assert(String(item.title).toLowerCase().includes('regression'))
      const repeated = await http('GET', '/appeals?search=Regression&search=check', cookie(user))
      const coerced = await http('GET', '/appeals?search=Regression%2Ccheck', cookie(user))
      assert.equal(repeated.status, 200)
      assert.equal(coerced.status, 200)
      assert.deepEqual(repeated.body, coerced.body)
      assert.equal((await http('GET', '/appeals?search=', cookie(user))).status, 200)
    })
  }
  for (const id of ['1e0', '0x1', '1.0', '2147483648']) {
    for (const [method, suffix, body] of [
      ['GET', '', undefined], ['PATCH', '/owner', { ownerId: operator.id }],
      ['PATCH', '/close', { outcome: 'Valid outcome' }],
    ] as const) {
      await check(`Shared id handling and 401 precedence: ${method} ${id}${suffix}`, async (): Promise<void> => {
        assert.equal((await http(method, `/appeals/${id}${suffix}`, cookie(manager), body)).status, 400)
        assert.equal((await http(method, `/appeals/${id}${suffix}`, '', body)).status, 401)
      })
    }
  }
  await check('Valid leading-zero decimal id still resolves to the same appeal', async (): Promise<void> => {
    const normal = await http('GET', `/appeals/${parent.id}/updateMessages`, cookie(a))
    const zeroPadded = await http('GET', `/appeals/000${parent.id}/updateMessages`, cookie(a))
    assert.equal(zeroPadded.status, 200)
    assert.deepEqual(zeroPadded.body, normal.body)
  })
  await check('Saved history survives API process exit and a new process', async (): Promise<void> => {
    const before = await history(parent.id, cookie(a))
    const storedBefore = await db().appealUpdateMessage.findMany({ orderBy: { id: 'asc' } })
    assert(before.length > 0)
    await stop()
    await db().$disconnect()
    prisma = undefined
    await start()
    assert.notEqual(processIds[0], processIds[1])
    assert.deepEqual(await history(parent.id, await login(a)), before)
    prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: testUrl.href }) })
    assert.deepEqual(await db().appealUpdateMessage.findMany({ orderBy: { id: 'asc' } }), storedBefore)
  })
}

async function run(): Promise<void> {
  try {
    await main()
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error)
    checks.push({ name: 'Harness setup/execution', result: 'FAIL', detail })
    process.stderr.write(`Harness failed: ${detail}\n`)
  } finally {
    try {
      await stop()
      if (prisma) await prisma.$disconnect()
      if (sqlConnected) await sql.end()
      if (databaseCreated) {
        assert(/^ops017_validation_[a-f0-9]{32}$/.test(databaseName))
        assert.notEqual(`/${databaseName}`, sourceUrl.pathname)
        await admin.query(`DROP DATABASE "${databaseName}"`)
        assert.equal((await admin.query('SELECT datname FROM pg_database WHERE datname = $1', [databaseName])).rows.length, 0)
      }
      report.cleanup = 'Owned API processes stopped, fixture connections closed, exact disposable database dropped and absence verified'
    } catch (error: unknown) {
      report.cleanup = 'FAILED; disposable database may require cleanup'
      report.cleanupDatabase = databaseName
      checks.push({ name: 'Cleanup', result: 'FAIL', detail: error instanceof Error ? error.message : String(error) })
    } finally {
      if (adminConnected) await admin.end()
    }
    const failed = checks.filter((item: CaseResult): boolean => item.result === 'FAIL').length
    report.summary = { passed: checks.length - failed, failed }
    report.exitCode = failed ? 1 : 0
    writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
    process.stdout.write(`${JSON.stringify(report.summary)}; ${String(report.cleanup)}\n`)
    process.exitCode = failed ? 1 : 0
  }
}

void run()
