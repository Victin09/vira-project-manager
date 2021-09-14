import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Project } from '../../projects/entities/project.entity';

export type ListDocument = List & Document;

@Schema()
export class List {
    @Prop()
    name: string;

    @Prop()
    order: number;

    @Prop()
    color: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
    board: Project;
}

export const ListSchema = SchemaFactory.createForClass(List);
