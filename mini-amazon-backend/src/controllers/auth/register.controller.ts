import type { Request, Response, NextFunction } from 'express';
import { registerService } from '../../services/auth/register.service.js';

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        const result = await registerService(email, password);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};