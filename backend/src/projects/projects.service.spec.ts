import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { Project, ProjectSchema } from './entities/project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
    let service: ProjectsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]), UsersModule],
            providers: [ProjectsService],
        }).compile();

        service = module.get<ProjectsService>(ProjectsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
