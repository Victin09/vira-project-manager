import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QueryParams } from './dto/query-params.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async findAll(params: QueryParams): Promise<Array<User>> {
        const nameFilter = params.name
            ? { name: { $regex: '.*' + params.name + '.*' } }
            : {};
        return await this.userModel.find(nameFilter).exec();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email });
    }

    async create(data: UserDto): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async update(id: string, data: UserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, data).exec();
    }

    async remove(id: string) {
        return await this.userModel.remove({ id: id }).exec();
    }
}
