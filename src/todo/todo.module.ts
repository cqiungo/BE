import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports:[MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    forwardRef(() => UsersModule)],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
