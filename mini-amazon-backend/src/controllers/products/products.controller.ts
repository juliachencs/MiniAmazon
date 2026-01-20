import type { ProductI } from "../../types/product.interface.js";
import type { Request, Response, NextFunction } from 'express';
import * as productsService from '../../services/products/products.service.js'
import { HttpBadRequestError } from "../../errors/bad-request-error.js";
import { HttpNotFoundError } from "../../errors/not-found-error.js";
import { isValidObjectId } from "mongoose";

export async function getProducts(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        // paginated product list request
        // TODO: edge conditions?
        if (req.query.offset && req.query.limit && req.query.sortby) {
            const result: ProductI[] = await productsService.getProductsPaginatedService(
                parseInt(req.query.offset as string),
                parseInt(req.query.limit as string),
                req.query.sortby as string
            )
            res.status(200).json({
                success: true,
                data: result
            });
        }
        // all product list request
        else {
            const result: ProductI[] = await productsService.getProductsService();
            res.status(200).json({
                success: true,
                data: result
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
        if (!req.params.id || !isValidObjectId(req.params.id)) throw new HttpBadRequestError('invalid id');

        const result: ProductI | null = await productsService.getProductByIdService(req.params.id);

        if (!result) throw new HttpNotFoundError('Product not found');

        res.status(200).json({
            success: true,
            data: result
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
        const result: number = await productsService.getProductCountService();
        res.status(200).json({
            success: true,
            data: result
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
        const result: ProductI = await productsService.addProductService(req.body);

        res.status(201).json({
            success: true,
            data: result
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
        if (!req.params.id || !isValidObjectId(req.params.id)) throw new HttpBadRequestError('invalid id');

        const result: ProductI | null = await productsService.updateProductByIdService(req.params.id, req.body);

        if (!result) {
            throw new HttpNotFoundError('Product not found');
        }

        res.status(201).json({
            success: true,
            data: result
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
        if (!req.params.id || !isValidObjectId(req.params.id)) throw new HttpBadRequestError('invalid id');

        const result: void | null = await productsService.deleteProductByIdService(req.params.id);

        if (!result) {
            throw new HttpNotFoundError('Product not found');
        }

        res.status(204).json({
            success: true
        });
    }
    catch (error) {
        next(error);
    }
}


// // DB population usage only
// export async function addProductBulk(
//     req: Request,
//     res: Response,
//     next: NextFunction): Promise<void> {
//     try {
//         const result: ProductI[] = await productsService.addProductBulkService(req.body);

//         res.status(201).json({
//             success: true,
//             data: result
//         });
//     }
//     catch (error) {
//         next(error);
//     }
// }