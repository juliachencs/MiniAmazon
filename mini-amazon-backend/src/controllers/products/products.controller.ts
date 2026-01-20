import type { ProductI } from "../../types/product.interface.js";
import type { Request, Response, NextFunction } from 'express';

export async function getProducts(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        if (req.query.offset && req.query.limit && req.query.sortby) {
            res.status(200).json({
                success: true,
                data: `getProducts, but offset=${req.query.offset}, limit=${req.query.limit}, sort=${req.query.sortby}`
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: 'getProducts'
            });
        }
    }
    catch (error) {
        next(error);
    }
}

export async function getProductById(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        res.status(200).json({
            success: true,
            data: `getById=${req.params.id}`
        });
    }
    catch (error) {
        next(error);
    }
}

export async function getProductCounts(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        res.status(200).json({
            success: true,
            data: 'getCounts'
        });
    }
    catch (error) {
        next(error);
    }
}

export async function addProduct(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        res.status(201).json({
            success: true,
            data: 'add'
        });
    }
    catch (error) {
        next(error);
    }
}

export async function updateProduct(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        res.status(201).json({
            success: true,
            data: `productUpdateId=${req.params.id}`
        });
    }
    catch (error) {
        next(error);
    }
}

export async function deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        res.status(204).json({
            success: true,
            data: `deleteId=${req.params.id}`
        });
    }
    catch (error) {
        next(error);
    }
}