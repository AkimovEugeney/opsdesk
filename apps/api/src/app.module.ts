import { Module } from '@nestjs/common';
import { AppealsModule } from './appeals/appeals.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AppealsModule],
})
export class AppModule {}
