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
} from '@nestjs/common'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { AuthenticatedUser } from '../auth/session/session.types'
import { AppealsService } from './appeals.service'
import { AssignOwnerDto } from './dto/assign-owner.dto'
import { CloseAppealDto } from './dto/close-appeal.dto'
import { CreateAppealDto } from './dto/create-appeal.dto'
import { ValidatePositiveInt32Pipe } from '../common/pipes/validate-positive-int32.pipe'

@Controller('appeals')
export class AppealsController {
  constructor(private readonly appealsService: AppealsService) {}

  @Get()
  getActiveAppeals(@Query('search') search?: string) {
    return this.appealsService.findActive(search)
  }

  @Get(':id')
  getAppealById(@Param('id', ParseIntPipe, new ValidatePositiveInt32Pipe('Id is not valid')) id: number) {
    return this.appealsService.getAppealById(id)
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
}
