import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Project, ProjectSchema } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
        ]),
        UsersModule,
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule {}
