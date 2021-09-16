import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { Project } from '../../projects/entities/project.entity';

export class CreateListDto {
    @IsString()
    @ApiProperty({ example: 'List 1' })
    readonly name: string;

    @IsNumber()
    @ApiProperty({ example: 2 })
    readonly order: number;

    @IsString()
    @ApiProperty({ example: 'cyan' })
    readonly color: string;

    @Type(() => Project)
    @ApiProperty({ example: 'Project _id' })
    readonly board: Project;
}
