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

    async findAll(): Promise<Project[]> {
        return await this.projectModel.find().exec();
    }

    async findOne(projectCode: string) {
        return await this.projectModel.findOne({ code: projectCode });
    }

    async findByUser(userMail: string): Promise<Project[]> {
        const user = await this.userService.findByEmail(userMail);
        return await this.projectModel.find({ users: user }).populate('type').populate('users').populate('responsible').exec();
    }

    async create(mail: string, data: CreateProjectDto): Promise<Project> {
        const user = (await this.userService.findByEmail(mail))['_id'];
        data.users.push(user);
        const code = Buffer.from(data.name).toString('base64');
        const project = new this.projectModel(data);
        project.code = code;
        project.responsible = user;
        data.users.forEach(async (u) => {
            const uData = await this.userService.findByEmail(u.email)['_id'];
            data.users.push(uData);
        });
        return await project.save();
    }

    async addUser(id: string, user: string): Promise<Project> {
        const userId = (await this.userService.findByEmail(user))['_id'];
        return await this.projectModel.findByIdAndUpdate(
            id,
            {
                $push: { users: userId },
            },
            { useFindAndModify: false },
        );
    }

    async removeUser(id: string, user: string): Promise<Project> {
        const userId = (await this.userService.findByEmail(user))['_id'];
        return await this.projectModel.findByIdAndUpdate(
            id,
            {
                $pull: { users: userId },
            },
            { useFindAndModify: false },
        );
    }

    async update(id: string, data: UpdateProjectDto): Promise<Project> {
        return await this.projectModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string): Promise<void> {
        return await this.projectModel.remove({ id: id }).exec();
    }
}
