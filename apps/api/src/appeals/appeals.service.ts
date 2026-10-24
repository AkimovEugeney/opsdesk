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
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ConflictException('State changed before update')
      }
      throw error
    }
  }

  async findAll(currentUser: AuthenticatedUser, search?: string) {
    const normalizedSearch = search?.trim() || undefined
    if (currentUser.role === UserRole.CLIENT) {
      return this.appealsRepository.findAllByClientId(currentUser.id, normalizedSearch)
    }
    if (currentUser.role === UserRole.OPERATOR) {
      return this.appealsRepository.findActive(normalizedSearch)
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

  async closeAppeal(id: number, outcome: string, currentUser: { id: number; role: UserRole }) {
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
      return await this.appealsRepository.closeAppeal(id, currentUser.id, outcome)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ConflictException('State changed before close')
      }
      throw error
    }
  }

  async createAppeal(title: string, description: string, user: { id: number; role: string }) {
    if (user.role != UserRole.CLIENT) {
      throw new ForbiddenException('')
    }
    return await this.appealsRepository.createAppeal(user.id, title, description)
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

    return await this.appealsRepository.createAppealUpdateMessage(author.id, appealId, message)
  }

  async getUpdateMessage(currentUser: AuthenticatedUser, appealId: number) {
    const appeal = await this.findAppealForUser(currentUser, appealId)

    if (!appeal) {
      throw new NotFoundException('Appeal not found')
    }

    return this.appealsRepository.getUpdateMessages(appealId)
  }
}
