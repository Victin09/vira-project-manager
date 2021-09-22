import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

import { ProjectType } from '../../project-types/entities/project-type.entity';
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

    @IsString()
    @Type(() => ProjectType)
    @ApiProperty({ example: 'Type' })
    readonly type: ProjectType;

    @IsArray({ always: false })
    @Type(() => User)
    @ApiProperty({ example: '[User1, User2, User3]' })
    readonly users: User[];

    @IsString()
    @Type(() => User)
    @ApiProperty({ example: 'User' })
    readonly responsible: User;
}
