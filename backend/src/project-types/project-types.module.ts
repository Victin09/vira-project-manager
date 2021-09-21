import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectTypesService } from './project-types.service';
import { ProjectTypesController } from './project-types.controller';
import { ProjectType, ProjectTypeSchema } from './entities/project-type.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: ProjectType.name, schema: ProjectTypeSchema }])],
    controllers: [ProjectTypesController],
    providers: [ProjectTypesService],
    exports: [ProjectTypesService],
})
export class ProjectTypesModule {}
