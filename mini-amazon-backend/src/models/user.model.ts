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
        role: Role.ADMIN
    }
];

export const UserModel = {
    async find(email : string): Promise<User | null>  {
        return userArray.find(user => user.email === email) ?? null;
    },

    // async create(email : string, password : string): Promise<User> {
    //     const user : User = {
    //         id: Math.random().toString(),
    //         email: email,
    //         password: password,
    //         role : Role.USER
    //     }
    //     userArray.push(user);
    //     return user;
    // }
}