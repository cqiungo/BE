import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { comparePassword } from '../helpers/ultil';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { CreateAuthDto } from './dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService:JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    const isValidPassword = await comparePassword(password, user.password);
    if(!user || !isValidPassword){
      return null;
    }
    return user;
  }

async signIn(user: any): Promise<{ user: { id: string; email: string; name: string; image?: string; todo: any[] }; access_token: string;}> {
  const foundUser = await this.userService.findByEmail(user.email);
  const isValidPassword = await comparePassword(user.password, foundUser.password);
  if (!isValidPassword) {
    throw new UnauthorizedException("Username/password không đúng");
  }
  const userObj = foundUser.toObject?.() ?? foundUser;
  const { password, ...safeUser } = userObj as { _id: { toString(): string }, email: string, password: string, image?: string, name?: string, todo?: any };
  const payload = { sub: safeUser._id.toString(), username: safeUser.email, image: safeUser.image, Todo: safeUser.todo };
  const access_token = await this.jwtService.signAsync(payload);
  await this.userService.update(safeUser._id.toString(),safeUser);
  return {
  user: {
    id: payload.sub,
    email: safeUser.email,
    name: safeUser.name ?? '', 
    image: safeUser.image,
    todo: safeUser.todo,
  },
  access_token,
  };
}

  async register(registerDto: CreateAuthDto){
    return this.userService.handleRegister(registerDto)
  }
}

