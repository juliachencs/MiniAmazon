import type { Response, NextFunction } from 'express';
import type { CartDTO } from '../../types/cart.interface.js';
import * as cartService from '../../services/cart/cart.service.js'
import type { AuthRequest } from '../../middlewares/auth.middleware.js';
import { isValidObjectId } from 'mongoose';
import { HttpBadRequestError, HttpUnauthorizedError } from '../../errors/http.error.js';

export async function getCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (!req.user || !req.user.email) {
            throw new HttpUnauthorizedError('Missing required auth data');
        }
        const result: CartDTO = await cartService.getCartService(req.user.email);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function clearCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (!req.user || !req.user.email) {
            throw new HttpUnauthorizedError('Missing required auth data');
        }
        const result: CartDTO = await cartService.clearCartService(req.user.email);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function addCartItem(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (!req.user || !req.user.email) {
            throw new HttpUnauthorizedError('Missing required auth data');
        }
        if (!req.body || !req.body.productId) {
            throw new HttpBadRequestError('Request item id to proceed');
        }

        const result: CartDTO = await cartService.addCartItemService(req.user.email, req.body.productId);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCartItem(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (!req.user || !req.user.email) {
            throw new HttpUnauthorizedError('Missing required auth data');
        }
        if (!req.body || !req.body.quantity) {
            throw new HttpBadRequestError('Quantity of item not provided');
        }
        if (!req.params.id || !isValidObjectId(req.params.id)) {
            throw new HttpBadRequestError('Id is invalid');
        }

        const result: CartDTO = await cartService.updateCartItemService(req.user.email, req.params.id, req.body.quantity);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteCartItem(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (!req.user || !req.user.email) {
            throw new HttpUnauthorizedError('Missing required auth data');
        }
        if (!req.params.id || !isValidObjectId(req.params.id)) {
            throw new HttpBadRequestError('Id is invalid');
        }

        const result: CartDTO = await cartService.deleteCartItemService(req.user.email, req.params.id);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function applyPromoCode(
    req: AuthRequest,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (!req.user || !req.user.email) {
            throw new HttpUnauthorizedError('Missing required auth data');
        }
        if (!req.body || !req.body.promoCode) {
            throw new HttpBadRequestError('Promocode not provided');
        }

        const result: CartDTO = await cartService.applyPromoCodeService(req.user.email, req.body.promoCode);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}