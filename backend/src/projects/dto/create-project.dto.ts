import { User } from 'src/users/entities/user.schema';

export class CreateProjectDto {
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly users: Array<User>;
}
