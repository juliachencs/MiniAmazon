import type { Request, Response, NextFunction } from 'express';

export async function signoutController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {

        res.status(200).json({
            success: true,
            data: 'signout successfull'
        });
    } catch (error) {
        next(error);
    }
};