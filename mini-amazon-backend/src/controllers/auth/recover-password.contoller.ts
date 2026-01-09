import type { Request, Response, NextFunction } from 'express';

export async function recoverPasswordController (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email } = req.body;

        const result: string = `Success sent email to ${email}`;

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};