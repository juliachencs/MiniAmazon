import type { Request, Response, NextFunction } from 'express';
import { HttpUnauthorizedError } from '../errors/unauthorized-error.js';
import type { AuthRequest } from './auth.middleware.js';
import type { Role } from '../types/role.enum.js';
import { HttpForbiddenError } from '../errors/forbidden-error.js';

export const authorizeRole = (...allowedRoles: Role[]) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            throw new HttpUnauthorizedError('Invalid authorization header');
        }

        const { role } = req.user;

        if (!allowedRoles.includes(role)) {
            throw new HttpForbiddenError('No permission in current role group');
        }

        next();
    }
}