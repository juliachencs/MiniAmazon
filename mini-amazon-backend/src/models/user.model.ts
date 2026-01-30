import type { UserI } from "../types/user.interface.js";
import { Role } from "../types/role.enum.js";
import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema<UserI>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.User }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<UserI>('User', userSchema);