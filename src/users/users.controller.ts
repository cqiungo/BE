import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'node:console';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { UploadService } from '../upload/upload.service';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { Public } from '../decorator/customize';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
// import { Multer } from 'multer';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createUserDto: CreateUserDto,@UploadedFile() file?: Multer.File) {
    if(!file) {
      log('No file uploaded, using default image');
      createUserDto.image = 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'; // Default image URL
      return this.userService.create(createUserDto);
    }
    const imageUrl = await this.uploadService.uploadImageToCloudinary(file);
    log('Image URL:', imageUrl.secure_url);
    createUserDto.image = imageUrl.secure_url;
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
      @Query() query: any,@Req() req: Request) 
    {
    return this.userService.findAll(+query.current, +query.pageSize);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.getUserWithTodos(id);
  }
  
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string,@Body() updateUserDto: UpdateUserDto,@UploadedFile() file: Multer.File) {
    if(!file){
      return this.userService.update(id, updateUserDto);
    }else{
      const imageUrl = await this.uploadService.uploadImageToCloudinary(file);
      updateUserDto.image = imageUrl.secure_url;
      return this.userService.update(id,updateUserDto);
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    log('Delete User ID:', id);
    return this.userService.remove(id);
  }

  @Public()
  @UseInterceptors(FileInterceptor('image'))
  @Post(':id')
  async addTodoToUser(@Param('id') id: string, @Body() todo: CreateTodoDto,@UploadedFile() file?: Multer.File) {
    if(!file) {
      log('No file uploaded, using default image');
      todo.image = ''; // Default image URL
      return this.userService.createTodoForUser(id,todo);
    }
    const imageUrl = await this.uploadService.uploadImageToCloudinary(file);
    todo.image = imageUrl.secure_url;
    return this.userService.createTodoForUser(id, todo);
  }


}
