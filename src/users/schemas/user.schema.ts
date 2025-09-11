// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Todo } from 'src/todo/schemas/todo.schema';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })
  email: string;

  @Prop({ required: true,
        minlength: 6 })
  password: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Todo' }] })
  todos: Todo[];

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
