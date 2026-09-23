import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { COOKIE_NAME, SESSION_ABSOLUTE_TIMEOUT_MS } from './session.constants'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_ABSOLUTE_TIMEOUT_MS,
      path: '/',
    })
    return loginResult.user
  }

  @Get('me')
  getMe(@Req() request: Request) {
    const sessionId: string | undefined = request.cookies?.[COOKIE_NAME]
    if (!sessionId) throw new UnauthorizedException('Session not found')
    return this.authService.getCurrentUser(sessionId)
  }
}
