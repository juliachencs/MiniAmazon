import type { UserI } from "../../types/user.interface.js";
import { User } from "../../models/user.model.js";
import { comparePassword } from "../../utils/password-comparer.util.js";
import type { authRespond } from "../../types/authRespond.interface.js";
import { generateToken } from "../../utils/jwt.util.js";
import { HttpBadRequestError, HttpConfilctError, HttpNotFoundError } from "../../errors/http.error.js";
import { hashPassword } from "../../utils/password-hashing.util.js";

export async function loginService(email: string, password: string): Promise<authRespond> {
    const user: UserI | null = await User.findOne({ email });

    if (!user) {
        throw new HttpNotFoundError('User not found');
    }

    const passwordMatch: boolean = await comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new HttpBadRequestError('Password not match');
    }

    const token = generateToken(user);

    return {
        role: user.role,
        token: token
    };
}

export async function registerService(email: string, password: string): Promise<authRespond> {
    const hasUser: UserI | null = await User.findOne({ email });

    if (hasUser) {
        throw new HttpConfilctError('User already exist');
    }

    const hashedPassword = await hashPassword(password);
    const user: UserI = await User.create({ email: email, password: hashedPassword });

    const token = generateToken(user);

    return {
        role: user.role,
        token: token
    }
}