import type { Request, Response, NextFunction } from 'express';
import type { CartDTO, CartI } from '../../types/cart.interface.js';
import * as cartService from '../../services/cart/cart.service.js'
import type { AuthRequest } from '../../middlewares/auth.middleware.js';
import { HttpUnauthorizedError } from '../../errors/unauthorized-error.js';
import { HttpBadRequestError } from '../../errors/bad-request-error.js';

export async function getCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    if (!req.user) {
        throw new HttpUnauthorizedError('Missing required auth data');
    }
    const result: CartDTO = await cartService.getCartService(req.user.email);

    res.status(200).json({
        success: true,
        data: result
    });
}

export async function clearCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    if (!req.user) {
        throw new HttpUnauthorizedError('Missing required auth data');
    }
    const result: CartDTO = await cartService.clearCartService(req.user.email);

    res.status(200).json({
        success: true,
        data: result
    });
}

export async function addCartItem(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    if (!req.user) {
        throw new HttpUnauthorizedError('Missing required auth data');
    }
    if (!req.body) {
        throw new HttpBadRequestError('Request item id to proceed');
    }

    const result: CartDTO | null = await cartService.addCartItemService(req.user.email, req.body.productId);

    res.status(200).json({
        success: true,
        data: result
    });
}