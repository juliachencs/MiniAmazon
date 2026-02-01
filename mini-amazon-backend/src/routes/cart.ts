import { Router } from "express";
import * as cartControllers from '../controllers/cart/cart.controller.js'
import { auth } from "../middlewares/auth.middleware.js";

export const cartRouter = Router();

cartRouter.use(auth);

cartRouter.get('/', cartControllers.getCart);
cartRouter.delete('/', cartControllers.clearCart);

cartRouter.post('/items', cartControllers.addCartItem);
cartRouter.put('/items/:productId', cartControllers.updateCartItem);
cartRouter.delete('/items/:productId', cartControllers.deleteCartItem);

cartRouter.post('/promo',cartControllers.applyPromoCode);