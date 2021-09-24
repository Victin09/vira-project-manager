import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { List } from '../../lists/entities/list.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
    @Prop()
    @ApiProperty({ example: 'Issue 1' })
    title: string;

    @Prop()
    @ApiProperty({ example: 'Iss1' })
    code: string;

    @Prop()
    @ApiProperty({ example: 'First issue!' })
    description: string;

    @Prop()
    @ApiProperty({ example: 1 })
    order: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'List' })
    @ApiProperty({ example: 'List _id' })
    list: List;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    @ApiProperty({ example: ['User 1 _id', 'User 2 _id'] })
    users: Array<User>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
    @ApiProperty({ example: 'Project _id' })
    project: Project;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
