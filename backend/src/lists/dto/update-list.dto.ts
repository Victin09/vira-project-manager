import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PartialType(CreateListDto) {
    @IsArray()
    @IsOptional()
    @Type(() => String)
    @ApiProperty({ example: '[Issue1, Issue2, Issue3]' })
    readonly issues: string[];
}
