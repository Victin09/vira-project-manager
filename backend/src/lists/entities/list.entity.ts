import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Project } from '../../projects/entities/project.entity';

export type ListDocument = List & Document;

@Schema()
export class List {
    @Prop()
    @ApiProperty({ example: 'In progress' })
    name: string;

    @Prop()
    @ApiProperty({ example: 2 })
    order: number;

    @Prop()
    @ApiProperty({ example: 'cyan' })
    color: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
    @ApiProperty({ example: 'Project _id' })
    board: Project;
}

export const ListSchema = SchemaFactory.createForClass(List);
