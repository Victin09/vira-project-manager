import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @ApiProperty({ example: 'Project one' })
    readonly name: string;

    @IsString()
    @ApiProperty({ example: 'This is the first project' })
    readonly description: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'base64;base64Image' })
    readonly image: string;

    @IsString()
    @Type(() => String)
    @ApiProperty({ example: 'Type' })
    readonly type: string;

    @IsArray()
    @IsOptional()
    @Type(() => String)
    @ApiProperty({ example: '[User1, User2, User3]' })
    readonly users: string[];

    @IsString()
    @Type(() => String)
    @ApiProperty({ example: 'User' })
    readonly responsible: string;
}
