import type { ProductI } from "../types/product.interface.js";
import { model, Schema } from "mongoose";

const ProductSchema = new Schema<ProductI>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStockQuant: { type: Number, required: true },
    imageURI: { type: String, required: true },
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: false }
})

export const Product = model<ProductI>('Product', ProductSchema);