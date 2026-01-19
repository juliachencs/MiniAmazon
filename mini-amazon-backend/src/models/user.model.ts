// TODO
// this is currently a dummy model and not have database attached with, just to mock the actual behavior of database
// rework later
import type { UserI } from "../types/user.interface.js";
import { Role } from "../types/role.enum.js";
import { model, Schema } from "mongoose";

const userSchema = new Schema<UserI>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER }
})

export const User = model<UserI>('User', userSchema);