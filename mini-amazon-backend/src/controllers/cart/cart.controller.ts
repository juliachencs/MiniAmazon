import type { Request, Response, NextFunction } from 'express';
import type { CartI } from '../../types/cart.interface.js';
import * as cartService from '../../services/cart/cart.service.js'
import type { AuthRequest } from '../../middlewares/auth.middleware.js';
import { HttpUnauthorizedError } from '../../errors/unauthorized-error.js';

export async function getCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    if (!req.user) {
        throw new HttpUnauthorizedError('Invalid authorization header');
    }
    const result: CartI = await cartService.getCartService(req.user.id);
}