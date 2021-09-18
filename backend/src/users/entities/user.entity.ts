import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    @ApiProperty({ example: 'johncena2134' })
    username: string;

    @Prop({ required: true })
    @ApiProperty({ example: '**********' })
    password: string;

    @Prop({ required: true })
    @ApiProperty({ example: 'John Cena' })
    name: string;

    @Prop({ required: true, unique: true })
    @ApiProperty({ example: 'johncena@best.es' })
    email: string;

    @Prop({ required: false })
    @ApiProperty({ example: 'base64;iconInBase64' })
    icon: string;

    // eslint-disable-next-line @typescript-eslint/ban-types
    validatePassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

const SALT_WORK_FACTOR = 10;
UserSchema.pre('save', async function save(next: HookNextFunction) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this['password'] = await bcrypt.hash(this['password'], salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this['password']);
};
