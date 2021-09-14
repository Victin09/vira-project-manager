import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
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
