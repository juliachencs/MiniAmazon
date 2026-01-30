import type { UserI } from "../../types/user.interface.js";
import { User } from "../../models/user.model.js";
import type { authRespond } from "../../types/authRespond.interface.js";
import { generateToken } from "../../utils/jwt.util.js";
import { HttpBadRequestError, HttpConfilctError, HttpNotFoundError } from "../../errors/http.error.js";
import type { HydratedDocument } from "mongoose";
import bcrypt from 'bcrypt'

export async function loginService(email: string, password: string): Promise<authRespond> {
    const user: HydratedDocument<UserI> | null = await User.findOne({ email });

    if (!user) {
        throw new HttpNotFoundError('User not found');
    }

    const passwordMatch: boolean = await matchPassword(password, user.password);

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

    // create didn't correctly awakened mongoose 'save' action
    // const user: UserI = await User.create({ email: email, password: password });

    const user = new User({ email: email, password: password });
    await user.save();

    const token = generateToken(user);

    return {
        role: user.role,
        token: token
    }
}

async function matchPassword(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
};