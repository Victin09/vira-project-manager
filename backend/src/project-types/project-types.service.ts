import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { ProjectType, ProjectTypeDocument } from './entities/project-type.entity';

@Injectable()
export class ProjectTypesService {
    constructor(@InjectModel(ProjectType.name) private projectTypeModel: Model<ProjectTypeDocument>) {}

    async findAll(): Promise<ProjectType[]> {
        return await this.projectTypeModel.find().exec();
    }

    async findOne(id: string): Promise<ProjectType> {
        return await this.projectTypeModel.findById(id).exec();
    }

    async findByName(name: string): Promise<ProjectType> {
        return await this.projectTypeModel.findOne({ name: name }).exec();
    }

    async create(data: CreateProjectTypeDto): Promise<ProjectType> {
        const pt = new this.projectTypeModel(data);
        return await pt.save();
    }

    async update(id: string, data: UpdateProjectTypeDto): Promise<ProjectType> {
        return await this.projectTypeModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string): Promise<void> {
        return await this.projectTypeModel.remove({ id: id }).exec();
    }
}
