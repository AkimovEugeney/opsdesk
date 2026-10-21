import { Module } from '@nestjs/common'
import { AppealsController } from './appeals.controller'
import { AppealsRepository } from './appeals.repository'
import { AppealsService } from './appeals.service'

@Module({
  providers: [AppealsService, AppealsRepository],
  controllers: [AppealsController],
})
export class AppealsModule {}
