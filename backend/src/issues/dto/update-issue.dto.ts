import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { CreateIssueDto } from './create-issue.dto';

interface IIssue {
    code: string;
    list: string;
    order: number;
    project: string;
    title: string;
    users: any[];
}
interface IColumn {
    code: string;
    issues: IIssue[];
    name: string;
}

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Iss1' })
    code: string;

    @IsArray()
    @IsOptional()
    @ApiProperty({ example: 'Backlog' })
    lists: IColumn[];

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Iss1' })
    lastList: string;
}
