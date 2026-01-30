import { Role } from "./role.enum.js";

export interface UserI {
    email: string;
    password: string;
    role: Role;
}