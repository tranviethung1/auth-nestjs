import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

    
    @IsNotEmpty()
    @IsString()
    username :string;

    @IsNotEmpty()
    password :string;

    @IsEmail()
    email :string;
}
