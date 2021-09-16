import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

import { List } from '../../lists/entities/list.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

export class CreateIssueDto {
    @IsString()
    @ApiProperty({ example: 'Issue 1' })
    readonly title: string;

    @IsString()
    @ApiProperty({ example: 'First issue!' })
    readonly description: string;

    @IsNumber()
    @ApiProperty({ example: 1 })
    readonly order: number;

    @Type(() => List)
    @ApiProperty({ example: 'List _id' })
    readonly list: List;

    @IsArray()
    @Type(() => User)
    @ApiProperty({ example: ['User 1 _id', 'User 2 _id'] })
    readonly users: Array<User>;

    @Type(() => Project)
    @ApiProperty({ example: 'Project _id' })
    readonly project: Project;
}
