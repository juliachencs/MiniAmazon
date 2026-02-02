import type { Types } from "mongoose";


interface productIdPop {
    _id: Types.ObjectId,
    name: string,
    price: number,
    inStockQuant: number,
    imageURI: string
}

export interface CartItemPop {
    productId: productIdPop | null;

    quantity: number;
    priceSnapshot: number;
    
    recentChangedPrice: boolean;
    recentChangedStock: boolean;
    avaliable: boolean;

    _id?: Types.ObjectId;
}
export interface CartItemI {
    productId: Types.ObjectId | null;

    quantity: number;
    priceSnapshot: number;
    
    recentChangedPrice: boolean;
    recentChangedStock: boolean;
    avaliable: boolean;

    _id?: Types.ObjectId;
}

export interface CartItemDTO extends CartItemI {
    productName: string;
    productImgURI: string;

    inStockQuant: number;

}