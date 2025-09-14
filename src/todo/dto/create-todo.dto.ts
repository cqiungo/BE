import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTodoDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;  

    @IsOptional()
    user:string

    @IsOptional()
    priority: string

    @IsOptional()
    category: string

    @IsOptional()
    start?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    end?: Date;

    @IsOptional()
    actualTime?: Date;

    @IsOptional()
    @IsString()
    image?: string;
}
