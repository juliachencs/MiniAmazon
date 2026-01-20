import { Router } from "express";
import { authRouter } from "./auth.js";
import { productsRouter} from "./products.js"

export const rootRouter = Router();
rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productsRouter)