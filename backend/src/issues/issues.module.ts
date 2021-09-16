import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue, IssueSchema } from './entities/issue.entity';
import { ListsModule } from '../lists/lists.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }]), ListsModule, ProjectsModule, UsersModule],
    controllers: [IssuesController],
    providers: [IssuesService],
})
export class IssuesModule {}
