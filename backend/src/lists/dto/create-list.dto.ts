import { Project } from '../../projects/entities/project.entity';

export class CreateListDto {
    readonly name: string;
    readonly order: number;
    readonly color: string;
    readonly board: Project;
}
