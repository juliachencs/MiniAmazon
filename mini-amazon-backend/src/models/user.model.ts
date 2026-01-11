// TODO
// this is currently a dummy model and not have database attached with, just to mock the actual behavior of database
// rework later
import type { User } from "../types/user.interface.js";
import { Role } from "../types/role.enum.js";


const userArray :  User[] = [
    {
        id: "1",
        email: "randon@abbc.com",
        password: "blablabla",
        role: Role.USER
    },

    {
        id: "2",
        email: "admin@user.com",
        password: "abc&ABC+1234",
        role: Role.ADMIN
    },
    {
        id: "3",
        email: "regular@user.com",
        password: "ABC@abc@123",
        role: Role.USER
    }
];

export const UserModel = {
    async find(email : string): Promise<User | null>  {
        return userArray.find(user => user.email === email) ?? null;
    },

    async has(email : string): Promise<boolean>  {
        return userArray.some(user => user.email === email);
    },

    async create(email : string, hashedPassword : string): Promise<User> {
        const user : User = {
            id: Math.random().toString(),
            email: email,
            password: hashedPassword,
            role : Role.USER
        }
        userArray.push(user);
        return user;
    }
}