import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @ApiProperty({ example: 'My best username' })
    readonly username: string;

    @IsString()
    @ApiProperty({ example: '**********' })
    readonly password: string;

    @IsString()
    @ApiProperty({ example: 'John Cena' })
    readonly name: string;

    @IsEmail()
    @ApiProperty({ example: 'johncena@best.es' })
    readonly email: string;

    @IsString()
    @ApiProperty({ example: 'base64;iconInBase64' })
    readonly icon: string;
}
