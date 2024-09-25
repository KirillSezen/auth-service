import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthServiceController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthServiceController],
  providers: [AuthService, JwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthServiceModule {}
