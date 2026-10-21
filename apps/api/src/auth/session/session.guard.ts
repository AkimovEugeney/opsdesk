import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '../auth.service'
import { PUBLIC_ROUTE } from '../decorators/public.decorator'
import { COOKIE_NAME } from './session.constants'
import type { SessionRequest } from '../session/session.types'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic === true) {
      return true
    }

    const request = context.switchToHttp().getRequest<SessionRequest>()
    const sessionId: unknown = request.cookies?.[COOKIE_NAME]

    if (typeof sessionId !== 'string' || sessionId.length === 0) {
      throw new UnauthorizedException('Session not found')
    }

    const currentUser = await this.authService.getCurrentUser(sessionId)
    request.user = currentUser

    return true
  }
}
