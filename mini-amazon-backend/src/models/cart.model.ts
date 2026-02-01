import { model, Schema } from "mongoose";
import type { CartItemI } from "../types/cartItem.interface.js";
import type { CartI } from "../types/cart.interface.js";
import { Types } from "mongoose";

const CartItemSchema = new Schema<CartItemI>({
    productId: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    priceSnapshot: { type: Number, required: true },
    recentChangedPrice: { type: Boolean, required: true, default: false },
    recentChangedStock: { type: Boolean, required: true, default: false }
});

const CartSchema = new Schema<CartI>({
    userId: { type: String, required: true, unique: true },
    products: { type: [CartItemSchema], required: true, default: [] },
    promoCode: { type: String, required: false, default: '' },
    subTotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    updateAt: { type: Date, required: false }
});

export const Cart = model<CartI>('Cart', CartSchema);