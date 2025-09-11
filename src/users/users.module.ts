import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UploadModule } from '../upload/upload.module';
import { LocalStrategy } from '../auth/passport/local.strategy';
import { JwtStrategy } from '../auth/passport/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule,UploadModule,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService,LocalStrategy,JwtStrategy,AuthService],
  exports:[UserService],
})
export class UsersModule {}
