import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue, IssueSchema } from './entities/issue.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }])],
    controllers: [IssuesController],
    providers: [IssuesService],
})
export class IssuesModule {}
