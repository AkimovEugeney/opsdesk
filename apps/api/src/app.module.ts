import { Module } from '@nestjs/common';
import { AppealsModule } from './appeals/appeals.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [PrismaModule, AppealsModule, AuthModule],
})
export class AppModule {}
