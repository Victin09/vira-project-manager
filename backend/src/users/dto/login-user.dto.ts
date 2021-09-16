import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @ApiProperty({ example: 'johncena@best.es' })
    readonly email: string;

    @IsString()
    @ApiProperty({ example: '**********' })
    readonly password: string;
}
