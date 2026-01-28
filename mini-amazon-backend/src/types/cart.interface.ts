import type { Types } from "mongoose";
import type { CartItemI } from "./cartItem.interface.js";

export interface CartI {
    userId?: Types.ObjectId;

    products: CartItemI[];

    promoCode: string;

    subTotal: number;
    discount: number;
    total: number;

    updateAt?: Date;
}