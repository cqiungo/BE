import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { log } from 'console';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '../decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Public()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() req:any) {
    return this.authService.signIn(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  
  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto){
    return this.authService.register(registerDto)
  }

  // @Get('send')
  // @Public()
  // sendEmail(){
  //   this.mailerService
  //     .sendMail({
  //       to: 'cngo98279@gmail.com', // list of receivers
  //       subject: 'Testing Nest MailerModule ✔', // Subject line
  //       text: 'welcome', // plaintext body
  //       template: 'register', // HTML body content
  //       context:{
  //         name:'John',
  //         activationCode:123
  //       }
  //     })
  //     .then(() => {return 'ok'})
  //     .catch(() => {return 'no'});
  //   return 'ok'
  // }
}

