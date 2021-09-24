import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { ProjectType } from '../../project-types/entities/project-type.entity';
import { User } from '../../users/entities/user.entity';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ unique: true })
    @ApiProperty({ example: 'Project one' })
    name: string;

    @Prop()
    @ApiProperty({ example: 'PO' })
    code: string;

    @Prop()
    @ApiProperty({ example: 'This is the first project' })
    description: string;

    @Prop()
    @ApiProperty({ example: 'base64;base64Image' })
    image: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ProjectType' })
    @ApiProperty({ example: 'Type _id' })
    type: ProjectType;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    @ApiProperty({ example: ['User 1 _id', 'User 2 _id'] })
    users: Array<User>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    @ApiProperty({ example: 'User _id' })
    responsible: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
