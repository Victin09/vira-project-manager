import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './entities/list.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ListsService {
    constructor(
        @InjectModel(List.name) private listModel: Model<ListDocument>,
        @Inject(forwardRef(() => ProjectsService)) private projectService: ProjectsService,
    ) {}

    async findAll(): Promise<List[]> {
        return await this.listModel.find().exec();
    }

    async findOne(code: string): Promise<List> {
        return await this.listModel.findOne({ code: code }).exec();
    }

    async findOneByProject(code: string, projectCode: string): Promise<List> {
        const project = await this.projectService.findOne(projectCode);
        return await this.listModel.findOne({ code: code, board: project }).exec();
    }

    async findByProject(id: string): Promise<List[]> {
        const project = await this.projectService.findOne(id);
        return await this.listModel
            .find({ board: project })
            .populate({ path: 'issues', options: { sort: { order: 'asc' } } })
            .sort({ order: 'asc' })
            .exec();
    }

    async create(data: CreateListDto): Promise<List> {
        const list = new this.listModel(data);
        return await list.save();
    }

    async createDefault(projectId: string, projectCode: string): Promise<void> {
        const defaultIssues = [
            {
                name: 'Open',
                code: Buffer.from(`${projectCode}-open`).toString('base64'),
                order: 1,
                board: projectId,
            },
            {
                name: 'Doing',
                code: Buffer.from(`${projectCode}-oing`).toString('base64'),
                order: 2,
                board: projectId,
            },
            {
                name: 'Done',
                code: Buffer.from(`${projectCode}-Done`).toString('base64'),
                order: 3,
                board: projectId,
            },
        ];
        return new Promise((resolve) => {
            defaultIssues.forEach(async (item) => {
                const list = new this.listModel(item);
                await list.save();
            });
            resolve();
        });
    }

    async addIssue(code: string, issue: string): Promise<List> {
        return await this.listModel.findOneAndUpdate(
            { code: code },
            {
                $push: { issues: issue },
            },
            { useFindAndModify: false },
        );
    }

    async removeIssue(code: string, issue: string): Promise<List> {
        return await this.listModel.findOneAndUpdate(
            { code: code },
            {
                $pull: { issues: issue },
            },
            { useFindAndModify: false },
        );
    }

    async updateIssues(code: string, issues: ObjectId[]): Promise<List> {
        return await this.listModel
            .findOneAndUpdate(
                { code: code },
                {
                    $set: {
                        issues: issues,
                    },
                },
                { useFindAndModify: false },
            )
            .exec();
    }

    async update(id: string, data: UpdateListDto): Promise<List> {
        return await this.listModel.findByIdAndUpdate(id, null).exec();
    }

    async remove(id: string): Promise<void> {
        const list = await this.listModel.findById(id).exec();
        await list.remove();
    }
}
