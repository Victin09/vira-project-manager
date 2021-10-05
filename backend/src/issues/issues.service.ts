import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue, IssueDocument } from './entities/issue.entity';
import { ListsService } from '../lists/lists.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class IssuesService {
    constructor(
        @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
        @Inject(forwardRef(() => ListsService)) private listService: ListsService,
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
        return await this.issueModel.find({ project: project }).populate('users').populate('list').sort({ code: 'asc' }).exec();
    }

    async findByUser(id: string): Promise<Issue[]> {
        const user = await this.userService.findOne(id);
        return await this.issueModel.find({ users: user }).exec();
    }

    async create(data: CreateIssueDto): Promise<Issue> {
        const project = await this.projectService.findOne(data.project);
        const list = await this.listService.findOneByProject(Buffer.from(`${project.code}-open`).toString('base64'), project.code);

        let code: string;
        const order = (await this.findByProject(data.project)).length + 1;
        const namesArray = project.name.trim().split(' ');
        if (namesArray.length === 1) code = `${namesArray[0].charAt(0)}-`;
        else code = `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}-`;

        const totalIssues = await this.findByProject(data.project);
        const lastCode = totalIssues.length
            ? totalIssues
                  .sort((a, b) => {
                      return b.code.toUpperCase().localeCompare(a.code.toUpperCase(), undefined, { numeric: true, sensitivity: 'base' });
                  })[0]
                  .code.split('-')
            : [];
        const codeNumber = lastCode.length ? parseInt(lastCode[lastCode.length - 1]) + 1 : 1;

        const issueData = new this.issueModel({
            title: data.title,
            code: (code + codeNumber).toUpperCase(),
            order: order,
            project: project['_id'],
            list: list['_id'],
        });
        const issue = await issueData.save();
        await this.listService.addIssue(list.code, issue._id);
        return issue;
    }

    async update(code: string, data: UpdateIssueDto): Promise<Issue> {
        const list = data.list ? await this.listService.findOne(data.list) : null;
        let issueData;
        if (list) {
            issueData = {
                description: data.description,
                list: list['_id'],
            };
        } else {
            issueData = {
                description: data.description,
            };
        }
        return await this.issueModel.findOneAndUpdate({ code: code }, issueData, { useFindAndModify: false, new: true }).populate('list').exec();
    }

    async updateOrder(data: UpdateIssueDto[]): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            data.forEach(async (item) => {
                await this.issueModel.findOneAndUpdate({ code: item.code }, { order: item.order }, { useFindAndModify: false }).exec();
            });
            resolve(true);
        });
    }

    async updateList(data: UpdateIssueDto): Promise<boolean> {
        return new Promise(async (resolve, _reject) => {
            const issue = await this.findOne(data.code);
            await this.update(data.code, data);
            await this.listService.addIssue(data.list, issue['_id']);
            await this.listService.removeIssue(data.lastList, issue['_id']);
            resolve(true);
        });
    }

    async updateListAndOrder(data: UpdateIssueDto): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            data.lists.forEach(async (item) => {
                const issues = [];
                const list = await this.listService.findOne(item.code);
                for await (const iss of item.issues) {
                    await this.issueModel
                        .findOneAndUpdate(
                            { code: iss.code },
                            {
                                order: iss.order,
                                list: list['_id'],
                            },
                            { useFindAndModify: false },
                        )
                        .exec();
                    issues.push(await (await this.findOne(iss.code))['_id']);
                }
                await this.listService.updateIssues(item.code, issues);
            });
            resolve(true);
        });
    }

    async changeUser(code: string, users: string[]): Promise<Issue> {
        const usersArray = [];
        for await (const u of users) {
            usersArray.push(await (await this.userService.findByEmail(u))['_id']);
        }
        return await this.issueModel
            .findOneAndUpdate(
                { code: code },
                {
                    users: usersArray,
                },
                { useFindAndModify: false, new: true },
            )
            .populate('users');
    }

    async remove(id: string): Promise<void> {
        const issue = await this.issueModel.findById(id).exec();
        issue.remove();
    }
}
