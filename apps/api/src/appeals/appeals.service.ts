import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
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

  async findActive(search?: string) {
    const normalizedSearch = search?.trim() || undefined
    if (normalizedSearch) {
      return this.appealsRepository.findActive(normalizedSearch)
    }
    return this.appealsRepository.findActive()
  }

  async getAppealById(id: number) {
    const appeal = await this.appealsRepository.findById(id)
    if (!appeal) {
      throw new NotFoundException(`Обращение с ID ${id} не найдено`)
    }
    return appeal
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

  async createAppeal(title: string, description: string, user: {id: number, role: string}) {
    if (user.role != UserRole.CLIENT) {
       throw new ForbiddenException('');
    }
    return await  this.appealsRepository.createAppeal(user.id, title,description)
  }
}
