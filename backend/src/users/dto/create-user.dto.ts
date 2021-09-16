import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly icon: string;
}
