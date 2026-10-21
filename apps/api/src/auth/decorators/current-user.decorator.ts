import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import type { AuthenticatedUser, SessionRequest } from '../session/session.types'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const request = context.switchToHttp().getRequest<SessionRequest>()
    const user = request.user

    if (!user) {
      throw new UnauthorizedException('Session not found')
    }

    return user
  },
)
