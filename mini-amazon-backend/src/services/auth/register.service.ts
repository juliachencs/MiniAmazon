import type { authRespond } from "../../types/authRespond.interface.js";
import type { UserI } from "../../types/user.interface.js";
import { User } from "../../models/user.model.js";
import { generateToken } from "../../utils/jwt.util.js";
import { hashPassword } from "../../utils/password-hashing.util.js";
import { HttpConfilctError } from "../../errors/conflict-error.js";


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