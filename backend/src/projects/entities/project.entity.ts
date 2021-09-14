import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from '../../users/entities/user.entity';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    users: Array<User>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
