import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from '../auth/auth.service'
import { COOKIE_NAME } from '../auth/session.constants'
import { AppealsService } from './appeals.service'

@Controller('appeals')
export class AppealsController {
  constructor(
    private readonly appealsService: AppealsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getActiveAppeals(@Query('search') search?: string) {
    return this.appealsService.findActive(search)
  }

  @Get(':id')
  getAppealById(@Param('id', new ParseIntPipe()) id: number) {
    if (id <= 0 || id > 2147483647) {
      throw new BadRequestException('Id is not valid')
    }
    return this.appealsService.getAppealById(id)
  }

  @Patch(':id/owner')
  async approveOwner(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
    @Body('ownerId') ownerId: number,
  ) {
    if (id <= 0 || id > 2147483647) {
      throw new BadRequestException('Id is not valid')
    }
    if (
      typeof ownerId !== 'number' ||
      !Number.isInteger(ownerId) ||
      ownerId <= 0 ||
      ownerId > 2147483647
    ) {
      throw new BadRequestException('ownerId must be a positive integer')
    }
    const sessionId: string | undefined = request.cookies?.[COOKIE_NAME]
    if (!sessionId) throw new UnauthorizedException('Session not found')
    const currentUser = await this.authService.getCurrentUser(sessionId)

    return this.appealsService.approveOwner(id, ownerId, {
      id: currentUser.id,
      role: currentUser.role,
      permissions: currentUser.permissions,
    })
  }
}
