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

    async findOne(code: string): Promise<Issue> {
        return await this.issueModel.findOne({ code: code }).populate('users').populate('list').exec();
    }

    async findByList(id: string): Promise<Issue[]> {
        const list = await this.listService.findOne(id);
        return await this.issueModel.find({ list: list }).exec();
    }

    async findByProject(projectCode: string): Promise<Issue[]> {
        const project = await this.projectService.findOne(projectCode);
        return await this.issueModel.find({ project: project }).populate('users').populate('list').sort({ order: 'asc' }).exec();
    }

    async findByUser(id: string): Promise<Issue[]> {
        const user = await this.userService.findOne(id);
        return await this.issueModel.find({ users: user }).exec();
    }

    async create(data: CreateIssueDto): Promise<Issue> {
        const project = await this.projectService.findOne(data.project);

        let code: string;
        const order = (await this.findByProject(data.project)).length + 1;
        const namesArray = project.name.trim().split(' ');
        if (namesArray.length === 1) code = `${namesArray[0].charAt(0)}-${order}`;
        else code = `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}-${order}`;

        const issue = new this.issueModel({
            title: data.title,
            code: code,
            order: order,
            project: project['_id'],
        });
        return await issue.save();
    }

    async update(id: string, data: UpdateIssueDto): Promise<Issue> {
        return await this.issueModel.findByIdAndUpdate(id, null).exec();
    }

    async updateOrder(data: UpdateIssueDto[]): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            data.forEach(async (item) => {
                await this.issueModel
                    .findOneAndUpdate(
                        { code: item.code },
                        {
                            order: item.order,
                        },
                    )
                    .exec();
            });
            resolve(true);
        });
    }

    async addUser(code: string, user: string): Promise<Issue> {
        const userId = (await this.userService.findByEmail(user))['_id'];
        const issue = await this.issueModel.findOneAndUpdate(
            { code: code },
            {
                $push: { users: userId },
            },
            { useFindAndModify: false },
        );
        return await this.findOne(code);
    }

    async removeUser(code: string, user: string): Promise<Issue> {
        const userId = (await this.userService.findByEmail(user))['_id'];
        return await this.issueModel.findOneAndUpdate(
            { code: code },
            {
                $pull: { users: userId },
            },
            { useFindAndModify: false },
        );
    }

    async remove(id: string): Promise<void> {
        const issue = await this.issueModel.findById(id).exec();
        issue.remove();
    }
}
