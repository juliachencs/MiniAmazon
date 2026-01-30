import { Router } from "express";
import { authRouter } from "./auth.js";
import { productsRouter } from "./products.js";
import { cartRouter } from "./cart.js";

export const rootRouter = Router();
rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/cart', cartRouter);