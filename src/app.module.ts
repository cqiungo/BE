import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';


@Module({
  imports: [UsersModule,MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService:ConfigService) => ({
        uri: process.env.MONGODB_URI,}),
      inject:[ConfigService]
    }), 
    ConfigModule.forRoot(),
    TodoModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,

    },
    AppService
  ],
})
export class AppModule {}
