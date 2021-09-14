import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { List } from '../../lists/entities/list.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    order: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'List' })
    list: List;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    users: Array<User>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
    project: Project;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
