import { Module } from "@nestjs/common";
import { AppealsController } from "./appeals.controller";
import { AppealsService } from './appeals.service';
import { AppealsRepository } from "./appeals.repository";

@Module({
  providers: [AppealsService, AppealsRepository],
  controllers: [AppealsController],
})
export class AppealsModule {}
