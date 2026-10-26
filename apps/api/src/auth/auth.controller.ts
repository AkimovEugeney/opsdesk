import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { Public } from './decorators/public.decorator'
import { LoginDto } from './dto/login.dto'
import { COOKIE_NAME, SESSION_ABSOLUTE_TIMEOUT_MS } from './session/session.constants'
import { AuthenticatedUser } from './session/session.types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    if (typeof dto?.email !== 'string' || dto?.email.trim() === '')
      throw new BadRequestException('Email and password are required')
    if (typeof dto?.password !== 'string' || dto?.password === '')
      throw new BadRequestException('Email and password are required')
    const loginResult = await this.authService.login(dto.email, dto.password)
    response.cookie(COOKIE_NAME, loginResult.sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.SESSION_COOKIE_SECURE !== 'false',
      maxAge: SESSION_ABSOLUTE_TIMEOUT_MS,
      path: '/',
    })
    return loginResult.user
  }

  @Get('me')
  getMe(@CurrentUser() currentUser: AuthenticatedUser) {
    return {
      id: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
    }
  }

  @Public()
  @Post('logout')
  @HttpCode(204)
  async logout(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
    const sessionId: unknown = request.cookies?.[COOKIE_NAME]
    if (typeof sessionId === 'string' && sessionId.length > 0) {
      await this.authService.logout(sessionId)
    }
    response.clearCookie(COOKIE_NAME, { path: '/' })
  }
}
