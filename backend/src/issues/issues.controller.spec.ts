import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { Issue, IssueSchema } from './entities/issue.entity';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

describe('IssuesController', () => {
    let controller: IssuesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }])],
            controllers: [IssuesController],
            providers: [IssuesService],
        }).compile();

        controller = module.get<IssuesController>(IssuesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
