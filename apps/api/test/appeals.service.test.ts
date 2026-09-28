import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { AppealsService } from '../src/appeals/appeals.service'
import { AppealsRepository } from '../src/appeals/appeals.repository'
import {
  AppealStatus,
  Permissions,
  UserRole,
} from '../src/generated/prisma/enums'
import { ConflictException, ForbiddenException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

test('allows a permitted operator to assign an appeal owner', async () => {
  const expectedResult = {
    id: 7,
    status: AppealStatus.IN_PROGRESS,
    ownerId: 2,
    updatedAt: new Date('2026-09-28T12:00:00.000Z'),
  }

  const repositoryStub = {
    findAssignmentStateById: async () => ({
      id: 7,
      status: AppealStatus.NEW,
    }),
    findUserRoleById: async () => ({
      id: 2,
      role: UserRole.OPERATOR,
    }),
    updateAppealOwner: async () => expectedResult,
  }

  const service = new AppealsService(
    repositoryStub as unknown as AppealsRepository,
  )

  const result = await service.approveOwner(7, 2, {
    id: 1,
    role: UserRole.OPERATOR,
    permissions: [Permissions.CAN_MANAGE_APPEALS],
  })

  assert.deepEqual(result, expectedResult)
})

test('rejects a client before repository access', async () => {
  const repositoryStub = {
    findAssignmentStateById: async () => {
      throw new Error('repository must not be called')
    },
    findUserRoleById: async () => {
      throw new Error('repository must not be called')
    },
    updateAppealOwner: async () => {
      throw new Error('repository must not be called')
    },
  }

  const service = new AppealsService(
    repositoryStub as unknown as AppealsRepository,
  )

  await assert.rejects(
    () =>
      service.approveOwner(7, 2, {
        id: 3,
        role: UserRole.CLIENT,
        permissions: [],
      }),
    (error: unknown) =>
      error instanceof ForbiddenException && error.getStatus() === 403,
  )
})

test('maps conditional update P2025 to conflict', async () => {
  const p2025 = new PrismaClientKnownRequestError(
    'Record to update not found',
    {
      code: 'P2025',
      clientVersion: '7.9.1',
    },
  )

  const repositoryStub = {
    findAssignmentStateById: async () => ({
      id: 7,
      status: AppealStatus.NEW,
    }),
    findUserRoleById: async () => ({
      id: 2,
      role: UserRole.OPERATOR,
    }),
    updateAppealOwner: async () => {
      throw p2025
    },
  }

  const service = new AppealsService(
    repositoryStub as unknown as AppealsRepository,
  )

  await assert.rejects(
    () =>
      service.approveOwner(7, 2, {
        id: 1,
        role: UserRole.OPERATOR,
        permissions: [Permissions.CAN_MANAGE_APPEALS],
      }),
    (error: unknown) =>
      error instanceof ConflictException && error.getStatus() === 409,
  )
})

test('rethrows an unexpected repository error', async () => {
  const databaseError = new Error("database unavailable")

  const repositoryStub = {
    findAssignmentStateById: async () => ({
      id: 7,
      status: AppealStatus.NEW,
    }),
    findUserRoleById: async () => ({
      id: 2,
      role: UserRole.OPERATOR,
    }),
    updateAppealOwner: async () => {
      throw databaseError
    },
  }

  const service = new AppealsService(
    repositoryStub as unknown as AppealsRepository,
  )

  await assert.rejects(
    () =>
      service.approveOwner(7, 2, {
        id: 1,
        role: UserRole.OPERATOR,
        permissions: [Permissions.CAN_MANAGE_APPEALS],
      }),
    (error: unknown) => error === databaseError,
  )
})


test('rethrows an unexpected repository error (2)', async () => {
  const p2023 = new PrismaClientKnownRequestError(
    'Record to update not found',
    {
      code: 'P2023',
      clientVersion: '7.9.1',
    },
  )

  const repositoryStub = {
    findAssignmentStateById: async () => ({
      id: 7,
      status: AppealStatus.NEW,
    }),
    findUserRoleById: async () => ({
      id: 2,
      role: UserRole.OPERATOR,
    }),
    updateAppealOwner: async () => {
      throw p2023
    },
  }

  const service = new AppealsService(
    repositoryStub as unknown as AppealsRepository,
  )

  await assert.rejects(
    () =>
      service.approveOwner(7, 2, {
        id: 1,
        role: UserRole.OPERATOR,
        permissions: [Permissions.CAN_MANAGE_APPEALS],
      }),
    (error: unknown) =>  error === p2023,
  )
})