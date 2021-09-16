import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

import { List } from '../../lists/entities/list.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

export class CreateIssueDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsNumber()
    readonly order: number;

    @Type(() => List)
    readonly list: List;

    @IsArray()
    @Type(() => User)
    readonly users: Array<User>;

    @Type(() => Project)
    readonly project: Project;
}
