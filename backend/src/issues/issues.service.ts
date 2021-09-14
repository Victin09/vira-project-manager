import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue, IssueDocument } from './entities/issue.entity';

@Injectable()
export class IssuesService {
    constructor(@InjectModel(Issue.name) private issueModel: Model<IssueDocument>) {}

    findAll() {
        return `This action returns all issues`;
    }

    async findOne(id: string): Promise<Issue> {
        return await this.issueModel.findById(id).exec();
    }

    async create(data: CreateIssueDto): Promise<Issue> {
        const issue = new this.issueModel(data);
        return await issue.save();
    }

    async update(id: string, data: UpdateIssueDto): Promise<Issue> {
        return await this.issueModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string) {
        const issue = await this.issueModel.findById(id).exec();
        issue.remove();
    }
}
