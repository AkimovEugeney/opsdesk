import { Injectable } from '@nestjs/common'
import { Prisma } from '../generated/prisma/client'
import { AppealStatus, UserRole } from '../generated/prisma/enums'
import { PrismaService } from '../prisma/prisma.service'

type AppealDetailsRow = {
  id: number
  status: AppealStatus
  title: string
  description: string
  createdAt: Date
  closedAt: Date | null
  outcome: string | null
  clientName: string
  ownerName: string | null
}

function escapeLikeLiteral(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
}

@Injectable()
export class AppealsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByClientId(
    clientId: number,
    limit: number,
    search?: string,
    after?: { id: number; createdAt: Date },
  ) {
    const filters: Prisma.AppealWhereInput = { clientId }
    if (search) {
      filters.title = {
        contains: escapeLikeLiteral(search),
        mode: 'insensitive',
      }
    }

    if (after) {
      filters.OR = [
        { createdAt: { lt: after.createdAt } },
        {
          createdAt: after.createdAt,
          id: { lt: after.id },
        },
      ]
    }
    return this.prismaService.appeal.findMany({
      where: filters,
      take: limit + 1,
      select: {
        id: true,
        status: true,
        title: true,
        createdAt: true,
        outcome: true,
        owner: { select: { name: true } },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    })
  }

  findActive(search?: string) {
    const pattern = search ? `%${escapeLikeLiteral(search)}%` : '%'

    return this.prismaService.$queryRaw`
    SELECT
        appeal."id",
        appeal."status",
        appeal."title",
        appeal."description",
        appeal."createdAt",
        client."name" AS "clientName",
        owner."name" AS "ownerName"
    FROM "Appeal" AS appeal
    JOIN "User" AS client
        ON client."id" = appeal."clientId"
    LEFT JOIN "User" AS owner
        ON owner."id" = appeal."ownerId"
    WHERE appeal."status" IN ('NEW', 'IN_PROGRESS')
    AND appeal."title" ILIKE ${pattern} ESCAPE '\\'
    ORDER BY
  CASE appeal."status"
    WHEN 'NEW' THEN 1
    WHEN 'IN_PROGRESS' THEN 2
  END,
  appeal."createdAt" DESC,
  appeal."id" DESC
  `
  }

  async getWorkloadSnapshot() {
    const [countActiveAppeals, unassignedAppealsCount, operatorRows] =
      await this.prismaService.$transaction(
        [
          this.countByStatuses([AppealStatus.IN_PROGRESS, AppealStatus.NEW]),
          this.countByStatuses([AppealStatus.NEW]),
          this.findOperatorWithWorkLoad(),
        ],
        {
          isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
        },
      )

    return {
      countActiveAppeals,
      unassignedAppealsCount,
      operatorRows,
    }
  }

  findOperatorWithWorkLoad() {
    return this.prismaService.user.findMany({
      where: { role: UserRole.OPERATOR },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            ownerAppeals: {
              where: { status: AppealStatus.IN_PROGRESS },
            },
          },
        },
      },
      orderBy: [{ id: 'asc' }],
    })
  }

  countByStatuses(statuses: AppealStatus[]) {
    return this.prismaService.appeal.count({
      where: {
        status: { in: statuses },
      },
    })
  }

  createAppeal(clientId: number, title: string, description: string) {
    return this.prismaService.appeal.create({
      data: {
        clientId,
        title,
        description,
        status: AppealStatus.NEW,
      },
      select: {
        id: true,
        status: true,
        title: true,
        description: true,
        createdAt: true,
      },
    })
  }

  getUpdateMessages(appealId: number) {
    return this.prismaService.appealUpdateMessage.findMany({
      where: { appealId },
      select: {
        id: true,
        message: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    })
  }

  createAppealUpdateMessage(
    authorId: number,
    appealId: number,
    message: string,
  ) {
    return this.prismaService.appealUpdateMessage.create({
      data: {
        authorId,
        appealId,
        message,
      },
      select: {
        id: true,
        message: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })
  }

  closeAppeal(id: number, ownerId: number, outcome: string) {
    return this.prismaService.appeal.update({
      where: { id, ownerId, status: AppealStatus.IN_PROGRESS },
      data: { status: AppealStatus.CLOSED, closedAt: new Date(), outcome },
      select: {
        id: true,
        status: true,
        outcome: true,
        closedAt: true,
        updatedAt: true,
      },
    })
  }

  updateAppealOwner(appealId: number, ownerId: number) {
    return this.prismaService.appeal.update({
      where: {
        id: appealId,
        status: { in: [AppealStatus.NEW, AppealStatus.IN_PROGRESS] },
      },
      data: { ownerId, status: AppealStatus.IN_PROGRESS },
      select: { id: true, status: true, ownerId: true, updatedAt: true },
    })
  }

  findUserRoleById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    })
  }
  findStateById(appealId: number) {
    return this.prismaService.appeal.findUnique({
      where: { id: appealId },
      select: { id: true, status: true, ownerId: true, clientId: true },
    })
  }

  findByIdAndClientId(id: number, clientId: number) {
    return this.prismaService.appeal.findUnique({
      where: { id, clientId },
      select: {
        id: true,
        status: true,
        title: true,
        description: true,
        createdAt: true,
        closedAt: true,
        outcome: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    })
  }

  async findById(id: number) {
    const rows = await this.prismaService.$queryRaw<AppealDetailsRow[]>`
    SELECT
        appeal."id",
        appeal."status",
        appeal."title",
        appeal."description",
        appeal."createdAt",
        appeal."closedAt",
        appeal."outcome",
        client."name" AS "clientName",
        owner."name" AS "ownerName"
    FROM "Appeal" AS appeal
    JOIN "User" AS client
        ON client."id" = appeal."clientId"
    LEFT JOIN "User" AS owner
        ON owner."id" = appeal."ownerId"
    WHERE appeal."id" = ${id}
  `

    return rows[0] ?? null
  }
}
