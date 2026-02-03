import type { Types } from "mongoose";

export interface ProductI {
    name: string;
    description: string;
    category: string;
    price: number;
    inStockQuant: number;
    imageURI: string;
    createAt?: Date;
    updateAt?: Date;
}

export interface ProductView extends ProductI {
    _id: Types.ObjectId;
}