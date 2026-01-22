import type { Types } from "mongoose";
import { Role } from "./role.enum.js";

export interface UserI {
    _id?: Types.ObjectId;
    email: string;
    password: string;
    role: Role;
}