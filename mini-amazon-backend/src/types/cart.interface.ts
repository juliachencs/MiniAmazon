import type { CartItemDTO, CartItemI } from "./cartItem.interface.js";

export interface CartI<T = CartItemI> {
    userId: string;

    products: T[];

    promoCode: string;

    subTotal: number;
    discount: number;
    total: number;

    updateAt?: Date;
}

export interface CartDTO extends CartI<CartItemDTO>{
}