import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

import { User } from '../../users/entities/user.entity';

export class CreateProjectDto {
    @IsString()
    @ApiProperty({ example: 'Project one' })
    readonly name: string;

    @IsString()
    @ApiProperty({ example: 'This is the first project' })
    readonly description: string;

    @IsString()
    @ApiProperty({ example: 'base64;base64Image' })
    readonly image: string;

    @IsArray({ always: false })
    @Type(() => User)
    @ApiProperty({ example: '[User1, User2, User3]' })
    readonly users?: Array<User>;
}
