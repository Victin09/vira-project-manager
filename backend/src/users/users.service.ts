import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QueryParams } from './dto/query-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll(params: QueryParams): Promise<User[]> {
        const nameFilter = params.name ? { name: { $regex: '.*' + params.name + '.*' } } : {};
        return await this.userModel.find(nameFilter).exec();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async create(data: CreateUserDto): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string): Promise<void> {
        return await this.userModel.remove({ id: id }).exec();
    }
}
