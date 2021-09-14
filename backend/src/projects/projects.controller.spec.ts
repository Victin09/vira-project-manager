import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { Project, ProjectSchema } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
    let controller: ProjectsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]), UsersModule],
            controllers: [ProjectsController],
            providers: [ProjectsService],
        }).compile();

        controller = module.get<ProjectsController>(ProjectsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
