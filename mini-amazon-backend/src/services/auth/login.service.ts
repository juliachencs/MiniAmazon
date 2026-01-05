import type { User } from "../../types/user.interface.js";
import { UserModel } from "../../models/user.model.js";
import { comparePassword } from "../../utils/password-comparer.util.js";
import type { authRespond } from "../../types/authRespond.interface.js";

export async function loginService(
    email : string,
    password : string
) : Promise<authRespond> {
    const user : User | null = await UserModel.find(email);

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch : boolean = comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new Error('Password not match');
    }

    // TODO: finish token generator
    // const token = generateToken({ userRole: user.role });
    const token : string = "somethingsupercomplicated"

    return {
        role: user.role,
        token: token
    };
}