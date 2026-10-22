import { Injectable } from '@nestjs/common'
import { Prisma } from '../generated/prisma/client'
import { AppealStatus } from '../generated/prisma/enums'
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

  async findAllByClientId(clientId: number, search?: string) {
    const filters: Prisma.AppealWhereInput = { clientId }
    if (search) {
      filters.title = {
        contains: escapeLikeLiteral(search),
        mode: 'insensitive',
      }
    }
    return this.prismaService.appeal.findMany({
      where: filters,
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

  async findActive(search?: string) {
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
  appeal."createdAt" DESC
  `
  }

  async createAppeal(clientId: number, title: string, description: string) {
    return await this.prismaService.appeal.create({
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

  async closeAppeal(id: number, ownerId: number, outcome: string) {
    return await this.prismaService.appeal.update({
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

  async updateAppealOwner(appealId: number, ownerId: number) {
    return this.prismaService.appeal.update({
      where: {
        id: appealId,
        status: { in: [AppealStatus.NEW, AppealStatus.IN_PROGRESS] },
      },
      data: { ownerId, status: AppealStatus.IN_PROGRESS },
      select: { id: true, status: true, ownerId: true, updatedAt: true },
    })
  }

  async findUserRoleById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    })
  }
  async findStateById(appealId: number) {
    return await this.prismaService.appeal.findUnique({
      where: { id: appealId },
      select: { id: true, status: true, ownerId: true },
    })
  }

  async findByIdAndClientId(id: number, clientId: number) {
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
