import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'email không được để trống' })
    email: string;
    @IsNotEmpty({ message: 'mật khẩu không được để trống' })
    password: string;
    @IsNotEmpty({ message: 'tên không được để trống' })
    name:string;
    @IsOptional()
    image:string;
}
