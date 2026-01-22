import { Router } from "express";
import * as productControllers from '../controllers/products/products.controller.js'
import { auth } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorize-role.middleware.js";
import { Role } from "../types/role.enum.js";

export const productsRouter = Router();

// // DB population only
// productsRouter.post('/bulk',productControllers.addProductBulk);

productsRouter.get('/', productControllers.getProducts);
productsRouter.get('/count', productControllers.getProductCounts);
productsRouter.get('/:id', productControllers.getProductById);

productsRouter.post('/', auth, authorizeRole(Role.Admin), productControllers.addProduct);
productsRouter.put('/:id', auth, authorizeRole(Role.Admin), productControllers.updateProduct);
productsRouter.delete('/:id', auth, authorizeRole(Role.Admin), productControllers.deleteProduct);