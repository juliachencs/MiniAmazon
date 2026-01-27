import type { Request, Response, NextFunction } from 'express';
import { registerService } from '../../services/auth/register.service.js';

export async function signupController (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email, password } = req.body;

        const result = await registerService(email, password);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};