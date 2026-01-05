import type { authRespond } from "../../types/authRespond.interface.js";
import type { User } from "../../types/user.interface.js";
import { UserModel } from "../../models/user.model.js";
import { generateToken } from "../../utils/jwt.util.js";


export async function registerService(email: string, password: string): Promise<authRespond> {
    const hasUser: boolean = await UserModel.has(email);

    if (hasUser) {
        throw new Error('User already exist');
    }

    //TODO
    // later we need to hash the password before we store it
    const hashedPassword = password;
    const user : User = await UserModel.create(email, hashedPassword);

    const token = generateToken(user);

    return {
        role: user.role,
        token: token
    }
}