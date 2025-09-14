import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/users/users.service';
@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>,
  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService
) {}
  create(createTodoDto: CreateTodoDto) {
    return this.todoModel.create(createTodoDto);
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: any) {
    return this.todoModel.findById({_id:id});
  }

async update(id: string, updateTodoDto: UpdateTodoDto) {
  const updatedTodo = await this.todoModel.findByIdAndUpdate(
    id,
    { $set: updateTodoDto },
    { new: true }, // trả về bản ghi mới
  );

  return updatedTodo;
}
  async remove(id: string,userId:string) {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);

    if (deletedTodo) {
      await this.userService.removeTodoFromUser(userId, id);
  }

  return deletedTodo;

  }
}
