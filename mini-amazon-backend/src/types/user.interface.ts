import { Role } from "./role.enum.js";

export interface User {
    id: string;
    email: string;
    password: string;
    role: Role;
}