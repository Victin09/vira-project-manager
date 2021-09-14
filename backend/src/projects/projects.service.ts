import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: mongoose.Model<ProjectDocument>,
        private userService: UsersService,
    ) {}

    async findAll(): Promise<Array<Project>> {
        return await this.projectModel.find().exec();
    }

    async findOne(id: string) {
        return await this.projectModel.findById(id);
    }

    async findByUser(userId: string) {
        const user = await this.userService.findOne(userId);
        return await this.projectModel.find({ users: user }).populate('users').exec();
    }

    async create(data: CreateProjectDto) {
        const project = new this.projectModel(data);
        return await project.save();
    }

    async addUser(id: string, user: string) {
        return await this.projectModel.findByIdAndUpdate(
            id,
            {
                $push: { users: user },
            },
            { useFindAndModify: false },
        );
    }

    async removeUser(id: string, user: string) {
        return await this.projectModel.findByIdAndUpdate(
            id,
            {
                $pull: { users: user },
            },
            { useFindAndModify: false },
        );
    }

    async update(id: string, data: UpdateProjectDto) {
        return await this.projectModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string) {
        return await this.projectModel.remove({ id: id }).exec();
    }
}
