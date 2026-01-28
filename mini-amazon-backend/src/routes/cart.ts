import { Router } from "express";
import * as cartControllers from '../controllers/cart/cart.controller.js'
import { auth } from "../middlewares/auth.middleware.js";

export const cartRouter = Router();

cartRouter.get('/', auth, cartControllers.getCart);
cartRouter.delete('/');

cartRouter.post('/items')
cartRouter.put('/items/:productId');
cartRouter.delete('/items/:productId');

cartRouter.post('/promo');