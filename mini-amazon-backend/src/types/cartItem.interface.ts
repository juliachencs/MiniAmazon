import type { Types } from "mongoose";


interface productIdPop {
    _id: Types.ObjectId,
    name: string,
    price: number,
    inStockQuant: number,
    imageURI: string
}

export interface CartItemPop {
    productId: productIdPop;

    quantity: number;
    priceSnapshot: number;
    
    recentChangedPrice: boolean;
    recentChangedStock: boolean;
}
export interface CartItemI {
    productId: Types.ObjectId;

    quantity: number;
    priceSnapshot: number;
    
    recentChangedPrice: boolean;
    recentChangedStock: boolean;
}

export interface CartItemDTO extends CartItemI {
    productName: string;
    productImgURI: string;

    inStockQuant: number;

}