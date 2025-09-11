import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;  

    @IsOptional()
    @IsDate()
    start?: Date;
    @IsOptional()
    @IsDate()
    end?: Date;
    @IsOptional()
    @IsDate()
    actualTime?: Date;
    @IsOptional()
    @IsString()
    image?: string;
}
