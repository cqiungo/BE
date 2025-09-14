import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from '../helpers/ultil';
import { log } from 'console';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { Todo } from '../todo/schemas/todo.schema';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoService } from 'src/todo/todo.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private todoService:TodoService
  ) {}

  isEmailExist = async (email: string)=> {
    const user = await this.userModel.exists({ email });
    return !!user;
  }

  async create( createUserDto: CreateUserDto) {
    const {name, email, password,image} = createUserDto;
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new Error(`Email đã tồn tại: ${email}`);
    }
    const hashedPassword = await hashPassword(password);
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      address: '',
      image: image || '',
    });
    return user.save();
  }

  async findAll(current: number, pageSize: number) {
    if (!current){
      current = 1;
    }
    if(!pageSize){
      pageSize = 10;
    }
    const filter = {}; // Add filter logic if needed, currently returns all users
    const limit = pageSize;
    const skip = (current - 1) * pageSize;
    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const results = await this.userModel
      .find()
      .limit(limit)
      .skip(skip);
    return results;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id:string,updateUserDto: UpdateUserDto) {
  return await this.userModel.findByIdAndUpdate({_id: id},updateUserDto)  
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete({_id: id})
    .then((result) => {
      if (!result) {
        throw new Error(`User with id ${id} not found`);
      }
      return { message: `User with id ${id} deleted successfully` };
    }).catch((error) => {
      throw new Error(`Error deleting user with id ${id}: ${error.message}`);
    })
  }

  async findByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email })
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
  async createTodoForUser(userId: string, dto: CreateTodoDto) {
    const {title,description,completed,priority,category,start,end,actualTime,image } = dto
    const newTodo = {
      title,
      description,
      completed,
      priority,
      category,
      start,
      end,
      actualTime,
      image,
    }
    const todo = await this.todoService.create({ ...dto, user: userId });

    const res = await this.userModel.findByIdAndUpdate(userId, {
      $push: { todos: todo._id },
    });

    return res;
  }
  async getUserWithTodos(userId: string) {
  return this.userModel
    .findById(userId)
    .populate('todos') // lấy full object thay vì chỉ id
    .exec();
}
    async removeTodoFromUser(userId: string, todoId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { todos: todoId } }, // xóa todoId ra khỏi mảng
      { new: true } // trả về user mới sau update
    );
  }

  async handleRegister(registerDto:CreateAuthDto){
    const {name, email, password} = registerDto;
    const emailExists = await this.isEmailExist(email);
    if (emailExists) {
      throw new Error(`Email đã tồn tại: ${email}`);
    }
    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      todo: [],
      image: 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png',
    });
    return {
      userId:user._id
    }
  }
}
