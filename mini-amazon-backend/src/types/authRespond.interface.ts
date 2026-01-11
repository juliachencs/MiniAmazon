import type { Role } from "./role.enum.js";

export interface authRespond {
    role: Role;
    token: string;
}