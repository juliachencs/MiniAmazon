import type { CartI } from "../../types/cart.interface.js";
import { Cart } from "../../models/cart.model.js";

export async function getCartService(userId: string): Promise<CartI> {
    const cart: CartI | null = await Cart.findOne({ userId });
    if (!cart) {
        // when user don't have cart yet, create a fake empty cart for now
        return {
            products: [],
            promoCode: '',
            subTotal: 0,
            discount: 0,
            total: 0
        }
    }
    else {
        return cart;
    }
}