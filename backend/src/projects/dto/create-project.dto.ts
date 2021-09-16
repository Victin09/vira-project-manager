import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

import { User } from '../../users/entities/user.entity';

export class CreateProjectDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly image: string;

    @IsArray()
    @Type(() => User)
    readonly users: Array<User>;
}
