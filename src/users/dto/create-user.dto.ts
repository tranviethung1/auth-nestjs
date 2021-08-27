import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../enums/role.decorator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    
    @ApiProperty({
        description: 'User name'
    })
    @IsNotEmpty()
    @IsString()
    username :string;

    @ApiProperty()
    @IsNotEmpty()
    password :string;

    @ApiProperty()
    @IsEmail()
    email :string;

    @ApiProperty({ enum: Role})
    @IsString()
    roles :string;
}
