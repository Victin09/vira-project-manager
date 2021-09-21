import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProjectTypeDocument = ProjectType & Document;

@Schema()
export class ProjectType {
    @Prop({ unique: true })
    @ApiProperty({ example: 'Project type one' })
    name: string;

    @Prop()
    @ApiProperty({ example: 'This is the first project type' })
    description: string;
}

export const ProjectTypeSchema = SchemaFactory.createForClass(ProjectType);
