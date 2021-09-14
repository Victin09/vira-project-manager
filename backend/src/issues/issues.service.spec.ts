import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { Issue, IssueSchema } from './entities/issue.entity';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
    let service: IssuesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }])],
            providers: [IssuesService],
        }).compile();

        service = module.get<IssuesService>(IssuesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
