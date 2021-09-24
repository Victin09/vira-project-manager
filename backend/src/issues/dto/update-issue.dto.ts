import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateIssueDto } from './create-issue.dto';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
    @IsString()
    @ApiProperty({ example: 'Iss1' })
    code: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Backlog' })
    list: string;
}
