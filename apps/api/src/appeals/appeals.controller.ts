import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { AuthenticatedUser } from '../auth/session/session.types'
import { ValidatePositiveInt32Pipe } from '../common/pipes/validate-positive-int32.pipe'
import { AppealsService } from './appeals.service'
import { AssignOwnerDto } from './dto/assign-owner.dto'
import { CloseAppealDto } from './dto/close-appeal.dto'
import { createAppealUpdateMessageDto } from './dto/create-appeal-update-message.dto'
import { CreateAppealDto } from './dto/create-appeal.dto'

@Controller('appeals')
export class AppealsController {
  constructor(private readonly appealsService: AppealsService) {}

  @Get()
  getAppeals(@CurrentUser() currentUser: AuthenticatedUser, @Query('search') search?: string) {
    return this.appealsService.findAll(currentUser, search)
  }

  @Get(':id')
  getAppealById(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseIntPipe, new ValidatePositiveInt32Pipe('Id is not valid')) id: number,
  ) {
    return this.appealsService.getAppealById(currentUser, id)
  }
  @Get('/:id/updateMessages')
  getUpdateMessage(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseIntPipe, new ValidatePositiveInt32Pipe('Id is not valid')) id: number
  ){
    return this.appealsService.getUpdateMessage(currentUser, id)
  }

  @Patch(':id/owner')
  async approveOwner(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseIntPipe, new ValidatePositiveInt32Pipe('Id is not valid')) id: number,
    @Body()
    body: AssignOwnerDto,
  ) {
    return this.appealsService.approveOwner(id, body.ownerId, {
      id: currentUser.id,
      role: currentUser.role,
      permissions: currentUser.permissions,
    })
  }

  @Patch(':id/close')
  async closeAppeal(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseIntPipe, new ValidatePositiveInt32Pipe('Id is not valid')) id: number,
    @Body()
    body: CloseAppealDto,
  ) {
    return this.appealsService.closeAppeal(id, body.outcome, {
      id: currentUser.id,
      role: currentUser.role,
    })
  }

  @Post()
  async createAppeal(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body()
    dto: CreateAppealDto,
  ) {
    return this.appealsService.createAppeal(dto.title, dto.description, {
      id: currentUser.id,
      role: currentUser.role,
    })
  }

  @Post('/:id/updateMessage')
  async createUpdateMessage(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseIntPipe, new ValidatePositiveInt32Pipe('Id is not valid')) id: number,
    @Body() body: createAppealUpdateMessageDto,
  ) {
    return this.appealsService.createAppealUpdateMessage(currentUser, id, body.message)
  }
}
