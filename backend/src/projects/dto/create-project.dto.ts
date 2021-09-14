import { User } from '../../users/entities/user.entity';

export class CreateProjectDto {
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly users: Array<User>;
}
