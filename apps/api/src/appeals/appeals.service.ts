import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { AuthenticatedUser } from '../auth/session/session.types'
import { AppealStatus, Permissions, UserRole } from '../generated/prisma/enums'
import { AppealsRepository } from './appeals.repository'

@Injectable()
export class AppealsService {
  constructor(private readonly appealsRepository: AppealsRepository) {}

  async approveOwner(
    id: number,
    ownerId: number,
    currentUser: {
      id: number
      role: UserRole
      permissions: Permissions[]
    },
  ) {
    if (
      currentUser.role !== UserRole.OPERATOR ||
      !currentUser.permissions.includes(Permissions.CAN_MANAGE_APPEALS)
    ) {
      throw new ForbiddenException('Appeal management is forbidden')
    }

    const appeal = await this.appealsRepository.findStateById(id)

    if (!appeal) {
      throw new NotFoundException('Appeal not found')
    }
    if (appeal.status === AppealStatus.CLOSED) {
      throw new ConflictException('Closed appeal cannot be changed')
    }

    const owner = await this.appealsRepository.findUserRoleById(ownerId)
    if (!owner) {
      throw new NotFoundException('Owner not found')
    }
    if (owner.role !== UserRole.OPERATOR) {
      throw new BadRequestException('Owner must be an operator')
    }

    try {
      return await this.appealsRepository.updateAppealOwner(id, ownerId)
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ConflictException('State changed before update')
      }
      throw error
    }
  }

  async getWorkload(currentUser: AuthenticatedUser) {
    if (
      currentUser.role !== UserRole.OPERATOR ||
      !currentUser.permissions.includes(Permissions.CAN_MANAGE_APPEALS)
    ) {
      throw new ForbiddenException('Workload reading is forbidden')
    }

    const { countActiveAppeals, unassignedAppealsCount, operatorRows } =
      await this.appealsRepository.getWorkloadSnapshot()

    type OperatorWithCount = (typeof operatorRows)[number]
    const operators = operatorRows.map((operator: OperatorWithCount) => ({
      id: operator.id,
      name: operator.name,
      appealsCount: operator._count.ownerAppeals,
    }))

    return {
      countActiveAppeals,
      unassignedAppealsCount,
      operators,
    }
  }

  async findAll(
    currentUser: AuthenticatedUser,
    search?: string,
    limit: number = 15,
    cursor?: string,
  ) {
    if (currentUser.role === UserRole.CLIENT) {
      let decodedCursor: unknown = undefined
      let after: { id: number; createdAt: Date } | undefined = undefined

      if (cursor !== undefined) {
        try {
          const cursorJson = Buffer.from(cursor, 'base64url').toString('utf8')
          decodedCursor = JSON.parse(cursorJson)

          if (
            typeof decodedCursor !== 'object' ||
            decodedCursor === null ||
            Array.isArray(decodedCursor)
          ) {
            throw new BadRequestException('Invalid cursor')
          }

          if (
            !('id' in decodedCursor) ||
            typeof decodedCursor.id !== 'number' ||
            !Number.isInteger(decodedCursor.id) ||
            decodedCursor.id < 1 ||
            decodedCursor.id > 2147483647
          ) {
            throw new BadRequestException('Invalid cursor')
          }

          if (
            !('createdAt' in decodedCursor) ||
            typeof decodedCursor.createdAt !== 'string'
          ) {
            throw new BadRequestException('Invalid cursor')
          }

          const createdAt = new Date(decodedCursor.createdAt)

          if (
            Number.isNaN(createdAt.getTime()) ||
            createdAt.toISOString() !== decodedCursor.createdAt
          ) {
            throw new BadRequestException('Invalid cursor')
          }

          after = {
            id: decodedCursor.id,
            createdAt,
          }
        } catch {
          throw new BadRequestException('Invalid cursor')
        }
      }

      const rows = await this.appealsRepository.findAllByClientId(
        currentUser.id,
        limit,
        search,
        after,
      )

      const hasMore = rows.length > limit
      const items = rows.slice(0, limit)

      const lastItem = items[items.length - 1]
      let nextCursor: string | null = null

      if (hasMore && lastItem) {
        const cursorData = {
          createdAt: lastItem.createdAt.toISOString(),
          id: lastItem.id,
        }

        const cursorJson = JSON.stringify(cursorData)
        nextCursor = Buffer.from(cursorJson).toString('base64url')
      }

      return { items, hasMore, nextCursor }
    }

    if (currentUser.role === UserRole.OPERATOR) {
      return this.appealsRepository.findActive(search)
    }

    throw new ForbiddenException('Appeal reading is forbidden')
  }

  async getAppealById(currentUser: AuthenticatedUser, id: number) {
    const appeal = await this.findAppealForUser(currentUser, id)

    if (!appeal) {
      throw new NotFoundException('Appeal not found')
    }

    return appeal
  }

  private findAppealForUser(currentUser: AuthenticatedUser, id: number) {
    if (currentUser.role === UserRole.CLIENT) {
      return this.appealsRepository.findByIdAndClientId(id, currentUser.id)
    }

    if (currentUser.role === UserRole.OPERATOR) {
      return this.appealsRepository.findById(id)
    }

    throw new ForbiddenException('Appeal reading is forbidden')
  }

  async closeAppeal(
    id: number,
    outcome: string,
    currentUser: { id: number; role: UserRole },
  ) {
    if (currentUser.role !== UserRole.OPERATOR) {
      throw new ForbiddenException('Appeal closing is forbidden')
    }
    const appeal = await this.appealsRepository.findStateById(id)
    if (!appeal) {
      throw new NotFoundException('Appeal not found')
    }

    if (appeal.ownerId !== currentUser.id) {
      throw new ForbiddenException('Appeal closing is forbidden')
    }

    if (appeal.status !== AppealStatus.IN_PROGRESS) {
      throw new ConflictException('Appeal cannot be closed')
    }

    try {
      return await this.appealsRepository.closeAppeal(
        id,
        currentUser.id,
        outcome,
      )
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ConflictException('State changed before close')
      }
      throw error
    }
  }

  createAppeal(
    title: string,
    description: string,
    user: { id: number; role: string },
  ) {
    if (user.role != UserRole.CLIENT) {
      throw new ForbiddenException('')
    }
    return this.appealsRepository.createAppeal(user.id, title, description)
  }

  async createAppealUpdateMessage(
    author: AuthenticatedUser,
    appealId: number,
    message: string,
  ) {
    if (author.role !== UserRole.OPERATOR) {
      throw new ForbiddenException('Appeal messages creating is forbidden')
    }

    const appeal = await this.appealsRepository.findStateById(appealId)
    if (!appeal) {
      throw new NotFoundException('Appeal not found')
    }
    return this.appealsRepository.createAppealUpdateMessage(
      author.id,
      appealId,
      message,
    )
  }

  async getUpdateMessage(currentUser: AuthenticatedUser, appealId: number) {
    const appeal = await this.findAppealForUser(currentUser, appealId)

    if (!appeal) {
      throw new NotFoundException('Appeal not found')
    }

    return this.appealsRepository.getUpdateMessages(appealId)
  }
}
