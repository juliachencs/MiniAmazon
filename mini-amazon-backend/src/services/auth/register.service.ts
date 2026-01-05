import type { authRespond } from "../../types/authRespond.interface.js";
import type { User } from "../../types/user.interface.js";
import { UserModel } from "../../models/user.model.js";


export async function registerService(email: string, password: string): Promise<authRespond> {
    const hasUser: boolean = await UserModel.has(email);

    if (hasUser) {
        throw new Error('User already exist');
    }

    //TODO
    // later we need to hash the password before we store it
    const hashedPassword = password;
    const user : User = await UserModel.create(email, hashedPassword);

    // TODO: finish token generator
    // const token = generateToken({ userRole: user.role });
    const token : string = "somethingsupercomplicatedNo." + Math.random()*100

    return {
        role: user.role,
        token: token
    }
}