import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AppealsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findActive() {
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
    ORDER BY
  CASE appeal."status"
    WHEN 'NEW' THEN 1
    WHEN 'IN_PROGRESS' THEN 2
  END,
  appeal."createdAt" DESC
  `;
  }
}
