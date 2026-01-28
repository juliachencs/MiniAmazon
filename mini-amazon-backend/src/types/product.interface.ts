import type { Types } from "mongoose";

export interface ProductI {
    _id?: Types.ObjectId;
    name: string;
    description: string;
    category: string;
    price: number;
    inStockQuant: number;
    imageURI: string;
    createAt?: Date;
    updateAt?: Date;
}