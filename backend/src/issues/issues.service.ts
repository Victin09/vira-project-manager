import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue, IssueDocument } from './entities/issue.entity';
import { ListsService } from '../lists/lists.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IssuesService {
    constructor(
        @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
        private listService: ListsService,
        private projectService: ProjectsService,
        private userService: UsersService,
    ) {}

    async findAll(): Promise<Issue[]> {
        return await this.issueModel.find().exec();
    }

    async findOne(id: string): Promise<Issue> {
        return await this.issueModel.findById(id).exec();
    }

    async findByList(id: string): Promise<Issue[]> {
        const list = await this.listService.findOne(id);
        return await this.issueModel.find({ list: list }).exec();
    }

    async findByProject(id: string): Promise<Issue[]> {
        const project = await this.projectService.findOne(id);
        return await this.issueModel.find({ project: project }).exec();
    }

    async findByUser(id: string): Promise<Issue[]> {
        const user = await this.userService.findOne(id);
        return await this.issueModel.find({ users: user }).exec();
    }

    async create(data: CreateIssueDto): Promise<Issue> {
        const issue = new this.issueModel(data);
        return await issue.save();
    }

    async update(id: string, data: UpdateIssueDto): Promise<Issue> {
        return await this.issueModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string): Promise<void> {
        const issue = await this.issueModel.findById(id).exec();
        issue.remove();
    }
}
