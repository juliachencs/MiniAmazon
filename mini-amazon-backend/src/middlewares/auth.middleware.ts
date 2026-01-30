import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express';
import { HttpUnauthorizedError } from '../errors/http.error.js';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authBearer = req.headers?.authorization?.match(/^Bearer (.+)/);

    if (!authBearer) {
        throw new HttpUnauthorizedError('Missing authorization header');
    }
    const token: string | undefined = authBearer[1];

    if (!token) {
        throw new HttpUnauthorizedError('No token or Token format incorrect');
    }

    try {
        const jwt_secret = process.env.JWT_SECRET || 'somethingsupersecret';

        const decoded: JwtPayload | string = await jwt.verify(token, jwt_secret);

        if (typeof decoded === 'string') {
            throw new HttpUnauthorizedError('Token format invalid');
        }

        req.user = decoded;

        next();
    } catch (err) {
        throw new HttpUnauthorizedError('Token is invalid');
    }
}