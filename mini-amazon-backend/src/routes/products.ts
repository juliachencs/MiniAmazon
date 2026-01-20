import { Router } from "express";
import * as productControllers from '../controllers/products/products.controller.js'

export const productsRouter = Router();

// // DB population only
// productsRouter.post('/bulk',productControllers.addProductBulk);

productsRouter.get('/', productControllers.getProducts);
productsRouter.get('/count', productControllers.getProductCounts);
productsRouter.get('/:id', productControllers.getProductById);

productsRouter.post('/',productControllers.addProduct);
productsRouter.put('/:id',productControllers.updateProduct);
productsRouter.delete('/:id',productControllers.deleteProduct);