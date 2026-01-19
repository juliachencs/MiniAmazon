// TODO
// this is currently a dummy model and not have database attached with, just to mock the actual behavior of database
// rework later
import type { UserI } from "../types/user.interface.js";
import { Role } from "../types/role.enum.js";
import { model, Schema } from "mongoose";

// const userSchema = new Schema<UserI>({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: Object.values(Role), default: Role.USER }
// })

// export const User = model<UserI>('User', userSchema);

const userArray: UserI[] = [
    {
        email: "randon@abbc.com",
        password: "blablabla",
        role: Role.USER
    },

    {
        email: "admin@user.com",
        password: "$2b$10$awSunrH05Bs7jxE12Wb3JeyjWSmvOyjJI7C8TSzdZEYdI1G4B0DQm",
        role: Role.ADMIN
    },
    {
        email: "regular@user.com",
        password: "ABC@abc@123",
        role: Role.USER
    }
];

export const UserModel = {
    async find(email: string): Promise<UserI | null> {
        return userArray.find(user => user.email === email) ?? null;
    },

    async has(email: string): Promise<boolean> {
        return userArray.some(user => user.email === email);
    },

    async create(email: string, hashedPassword: string): Promise<UserI> {
        const user: UserI = {
            email: email,
            password: hashedPassword,
            role: Role.USER
        }
        userArray.push(user);
        return user;
    }
}