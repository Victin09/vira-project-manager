import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIssueDto {
    @IsString()
    @ApiProperty({ example: 'Issue 1' })
    readonly title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'First issue!' })
    readonly description: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1 })
    readonly order: number;

    @Type(() => String)
    @IsOptional()
    @ApiProperty({ example: 'List _id' })
    readonly list: string;

    @IsArray()
    @IsOptional()
    @Type(() => String)
    @ApiProperty({ example: ['User 1 _id', 'User 2 _id'] })
    readonly users: string[];

    @Type(() => String)
    @ApiProperty({ example: 'Project _id' })
    readonly project: string;
}
