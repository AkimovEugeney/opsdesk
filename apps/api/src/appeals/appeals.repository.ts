import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { type AppealStatus } from "../generated/prisma/enums";

type AppealDetailsRow = {
  id: number;
  status: AppealStatus;
  title: string;
  description: string;
  createdAt: Date;
  closedAt: Date | null;
  clientName: string;
  ownerName: string | null;
};

function escapeLikeLiteral(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

@Injectable()
export class AppealsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActive(search?: string) {
    const pattern = search ? `%${escapeLikeLiteral(search)}%` : "%";

    return this.prisma.$queryRaw`
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
    AND appeal."title" ILIKE ${pattern} ESCAPE '\'
    ORDER BY
  CASE appeal."status"
    WHEN 'NEW' THEN 1
    WHEN 'IN_PROGRESS' THEN 2
  END,
  appeal."createdAt" DESC
  `;
  }

  async findById(id: number) {
    const rows = await this.prisma.$queryRaw<AppealDetailsRow[]>`
    SELECT
        appeal."id",
        appeal."status",
        appeal."title",
        appeal."description",
        appeal."createdAt",
        appeal."closedAt",
        client."name" AS "clientName",
        owner."name" AS "ownerName"
    FROM "Appeal" AS appeal
    JOIN "User" AS client
        ON client."id" = appeal."clientId"
    LEFT JOIN "User" AS owner
        ON owner."id" = appeal."ownerId"
    WHERE appeal."id" = ${id}
  `;

    return rows[0] ?? null;
  }
}
