import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthServiceModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthServiceModule],
})
export class AppModule {}
