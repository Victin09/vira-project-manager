import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { Project } from '../../projects/entities/project.entity';

export class CreateListDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly order: number;

    @IsString()
    readonly color: string;

    @Type(() => Project)
    readonly board: Project;
}
