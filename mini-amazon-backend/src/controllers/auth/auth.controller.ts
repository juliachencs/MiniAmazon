import type { Request, Response, NextFunction } from 'express';
import type { authRespond } from '../../types/authRespond.interface.js';
import { loginService, registerService } from '../../services/auth/auth.service.js';

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email, password } = req.body;

        const result: authRespond = await loginService(email, password);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export async function signup(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email, password } = req.body;

        const result: authRespond = await registerService(email, password);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export async function signout(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.status(204).json({
            success: true,
            data: 'signout successfull'
        });
    } catch (error) {
        next(error);
    }
};

export async function recoverPassword(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email } = req.body;

        const result: string = `Success sent email to ${email}`;

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};