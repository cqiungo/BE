// todo.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop()
  priority: string

  @Prop()
  category: string

  @Prop()
  image: string;

  @Prop({ type: Date, default: Date.now })
  start: Date;

  @Prop({ type: Date })
  end: Date;

  @Prop({ type: Date })
  actualTime: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
