import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Project, ProjectSchema } from './entities/project.entity';
import { UsersModule } from '../users/users.module';
import { ProjectTypesModule } from '../project-types/project-types.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
        UsersModule,
        ProjectTypesModule,
        forwardRef(() => ListsModule),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}
