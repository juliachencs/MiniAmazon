import type { UserI } from "../types/user.interface.js";
import { Role } from "../types/role.enum.js";
import { model, Schema } from "mongoose";

const userSchema = new Schema<UserI>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.User },
});

export const User = model<UserI>("User", userSchema);
