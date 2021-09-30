import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.entity';
import { UsersService } from '../users/users.service';
import { ProjectTypesService } from '../project-types/project-types.service';
import { ListsService } from '../lists/lists.service';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: mongoose.Model<ProjectDocument>,
        private userService: UsersService,
        private projectType: ProjectTypesService,
        @Inject(forwardRef(() => ListsService))
        private listService: ListsService,
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
        const code = Buffer.from(data.name).toString('base64');
        const type = (await this.projectType.findByName(data.type))['_id'];
        const users: mongoose.Schema.Types.ObjectId[] = [];
        users.push(user);
        data.users.forEach(async (u) => {
            const uData = (await this.userService.findByEmail(u))['_id'];
            users.push(uData);
        });

        const project = new this.projectModel({
            name: data.name,
            code: code,
            description: data.description,
            image: data.image,
            type: type,
            users: users,
            responsible: user,
        });
        const result = await project.save();
        await this.listService.createDefault(result._id, result.code);
        return result;
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
        return await this.projectModel.findByIdAndUpdate(id, null).exec();
    }

    async remove(id: string): Promise<void> {
        return await this.projectModel.remove({ id: id }).exec();
    }
}
