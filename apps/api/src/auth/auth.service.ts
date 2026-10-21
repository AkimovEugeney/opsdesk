import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { verifyPassword } from './password'
import { generateSessionId } from './session/session-id'
import { isSessionExpired } from './session/session-timeout'
import { AuthenticatedUser } from './session/session.types'

const DUMMY_PASSWORD_HASH =
  '$argon2id$v=19$m=65536,p=4,t=3$VQeHSnD7gBbypltXIM34UQ$LVzHYldhI15pF3Q8uO9tkxDPM0OSY3jq2FOer8M2wv0'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(email: string, password: string) {
    const loginTextError = 'Invalid email or password'

    const user = await this.findUserByEmail(email)
    const passwordHash = user?.passwordHash ?? DUMMY_PASSWORD_HASH
    const isPasswordValid = await verifyPassword(password, passwordHash)
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException(loginTextError)
    }

    const sessionId = await this.createSession(user.id)
    return {
      sessionId,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    }
  }

  async getCurrentUser(sessionId: string): Promise<AuthenticatedUser> {
    const nowDate = new Date()
    const session = await this.prismaService.session.findUnique({
      where: { id: sessionId },
      select: {
        createdAt: true,
        lastActivityAt: true,
        user: { select: { id: true, name: true, role: true, permissions: true } },
      },
    })

    if (!session) throw new UnauthorizedException('Session not found')
    if (isSessionExpired(session.createdAt, session.lastActivityAt, nowDate))
      throw new UnauthorizedException('Session not found')

    const updateResult = await this.prismaService.session.updateMany({
      where: { id: sessionId },
      data: { lastActivityAt: nowDate },
    })

    if (updateResult.count === 0) {
      throw new UnauthorizedException('Session not found')
    }

    return session.user
  }

  async logout(sessionId: string) {
    await this.prismaService.session.deleteMany({ where: { id: sessionId } })
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, name: true, role: true, passwordHash: true },
    })
  }

  async createSession(userId: number) {
    const sessionId = generateSessionId()
    const session = await this.prismaService.session.create({
      data: {
        id: sessionId,
        userId: userId,
        lastActivityAt: new Date(),
      },
    })
    return session.id
  }
}
