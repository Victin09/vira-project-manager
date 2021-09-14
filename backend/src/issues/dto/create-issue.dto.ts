import { List } from '../../lists/entities/list.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

export class CreateIssueDto {
    readonly title: string;
    readonly description: string;
    readonly order: number;
    readonly list: List;
    readonly users: Array<User>;
    readonly project: Project;
}
