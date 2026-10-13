import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from '../auth/auth.service'
import { COOKIE_NAME } from '../auth/session.constants'
import { AppealsService } from './appeals.service'
import { AssignOwnerDto } from './dto/assign-owner.dto'
import { CloseAppealDto } from './dto/close-appeal.dto'
import { CreateAppealDto } from './dto/create-appeal.dto'

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
    @Body()
    body: AssignOwnerDto,
  ) {
    if (id <= 0 || id > 2147483647) {
      throw new BadRequestException('Id is not valid')
    }
    const { ownerId } = body
    const sessionId: string | undefined = request.cookies?.[COOKIE_NAME]
    if (!sessionId) throw new UnauthorizedException('Session not found')
    const currentUser = await this.authService.getCurrentUser(sessionId)

    return this.appealsService.approveOwner(id, ownerId, {
      id: currentUser.id,
      role: currentUser.role,
      permissions: currentUser.permissions,
    })
  }

  @Patch(':id/close')
  async closeAppeal(
    @Req() request: Request,
    @Param('id', new ParseIntPipe()) id: number,
    @Body()
    body: CloseAppealDto,
  ) {
    if (id <= 0 || id > 2147483647) {
      throw new BadRequestException('Id is not valid')
    }
    const sessionId: string | undefined = request.cookies?.[COOKIE_NAME]
    if (!sessionId) throw new UnauthorizedException('Session not found')
    const currentUser = await this.authService.getCurrentUser(sessionId)
    return this.appealsService.closeAppeal(id, body.outcome, {
      id: currentUser.id,
      role: currentUser.role,
    })
  }

  @Post()
  async createAppeal(
    @Req() request: Request,
    @Body()
    dto: CreateAppealDto,
  ) {
    const sessionId: string | undefined = request.cookies?.[COOKIE_NAME]
    if (!sessionId) throw new UnauthorizedException('Session not found')
    const currentUser = await this.authService.getCurrentUser(sessionId)
    return this.appealsService.createAppeal(dto.title, dto.description, {
      id: currentUser.id,
      role: currentUser.role,
    })
  }
}
