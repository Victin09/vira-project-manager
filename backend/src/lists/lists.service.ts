import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './entities/list.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ListsService {
    constructor(@InjectModel(List.name) private listModel: Model<ListDocument>, private projectService: ProjectsService) {}

    async findAll(): Promise<List[]> {
        return await this.listModel.find().exec();
    }

    async findOne(id: string): Promise<List> {
        return await this.listModel.findById(id).exec();
    }

    async findByProject(id: string): Promise<List[]> {
        const project = await this.projectService.findOne(id);
        return await this.listModel.find({ board: project }).exec();
    }

    async create(data: CreateListDto): Promise<List> {
        const list = new this.listModel(data);
        return await list.save();
    }

    async update(id: string, data: UpdateListDto): Promise<List> {
        return await this.listModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string): Promise<void> {
        const list = await this.listModel.findById(id).exec();
        await list.remove();
    }
}
