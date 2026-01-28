import type { Types } from "mongoose";

export interface CartItemI {
    productId: Types.ObjectId;

    productName?: string;
    productImgURI?: string;

    quantity: number;
    inStockQuant?: number;

    priceSnapshot: number;

    recentChangedPrice?: boolean;
    recentChangedStock?: boolean;
}