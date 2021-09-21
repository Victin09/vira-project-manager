import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectTypeDto {
    @IsString()
    @ApiProperty({ example: 'Project type one' })
    readonly name: string;

    @IsString()
    @ApiProperty({ example: 'This is the first project type' })
    readonly description: string;
}
