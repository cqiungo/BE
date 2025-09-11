import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty({ message: 'email không được để trống' })
    @IsEmail({}, { message: 'email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: 'password không được để trống' })
    password: string;

    @IsOptional()
    image?: string;
}
