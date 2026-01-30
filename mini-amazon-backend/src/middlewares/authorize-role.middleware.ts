import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './auth.middleware.js';
import type { Role } from '../types/role.enum.js';
import { HttpForbiddenError, HttpUnauthorizedError } from '../errors/http.error.js';

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