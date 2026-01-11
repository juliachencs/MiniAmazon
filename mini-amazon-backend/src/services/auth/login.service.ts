import type { User } from "../../types/user.interface.js";
import { UserModel } from "../../models/user.model.js";
import { comparePassword } from "../../utils/password-comparer.util.js";
import type { authRespond } from "../../types/authRespond.interface.js";
import { generateToken } from "../../utils/jwt.util.js";
import { HttpNotFoundError } from "../../errors/not-found-error.js";
import { HttpBadRequestError } from "../../errors/bad-request-error.js";

export async function loginService(
    email : string,
    password : string
) : Promise<authRespond> {
    const user : User | null = await UserModel.find(email);

    if (!user) {
        throw new HttpNotFoundError('User not found');
    }

    const passwordMatch : boolean = comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new HttpBadRequestError('Password not match');
    }

    const token = generateToken(user);

    return {
        role: user.role,
        token: token
    };
}