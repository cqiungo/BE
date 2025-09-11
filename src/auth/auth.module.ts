import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,ConfigService],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 's1e2c3r4',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
