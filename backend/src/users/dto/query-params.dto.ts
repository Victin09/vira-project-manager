import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class QueryParams {
    @IsNumber()
    @ApiProperty({ example: 0, required: false })
    readonly start?: number;

    @IsNumber()
    @ApiProperty({ example: 10, required: false })
    readonly limit?: number;

    @IsString()
    @ApiProperty({ example: 'John Cena', required: false })
    readonly name?: string;
}
