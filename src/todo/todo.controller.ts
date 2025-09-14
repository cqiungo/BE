import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Public } from '../decorator/customize';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: any) {
    console.log(updateTodoDto)
    return this.todoService.update(id, updateTodoDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string,@Body() userid:any) {
    console.log(userid)
    return this.todoService.remove(id,userid.id);
  }
}
