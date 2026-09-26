import { PrismaService } from './prisma/prisma.service'

export async function probeSessionLookup(prisma: PrismaService, sessionId: string) {
  return prisma.session.findUnique({
    where: { id: sessionId },
    select: {
      createdAt: true,
      lastActivityAt: true,
      user: { select: { id: true, name: true, role: true } },
    },
  })
}

export async function probeSessionUpdate(prisma: PrismaService, sessionId: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { lastActivityAt: new Date() },
  })
}
