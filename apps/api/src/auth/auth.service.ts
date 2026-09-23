import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { verifyPassword } from './password'
import { generateSessionId } from './session-id'
import { isSessionExpired } from './session-timeout'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(email: string, password: string) {
    const loginTextError = 'Invalid email or password'

    const user = await this.findUserByEmail(email)
    if (!user) throw new UnauthorizedException(loginTextError)

    const isPasswordValid = await verifyPassword(password, user.passwordHash)
    if (!isPasswordValid) throw new UnauthorizedException(loginTextError)

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

  async getCurrentUser(sessionId: string) {
    const nowDate = new Date()
    const session = await this.prismaService.session.findUnique({
      where: { id: sessionId },
      select: {
        createdAt: true,
        lastActivityAt: true,
        user: { select: { id: true, name: true, role: true } },
      },
    })

    if (!session) throw new UnauthorizedException('Session not found')
    if (isSessionExpired(session.createdAt, session.lastActivityAt, nowDate))
      throw new UnauthorizedException('Session not found')

    await this.prismaService.session.update({ where: { id: sessionId }, data: {lastActivityAt: nowDate} })
    return session.user
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
