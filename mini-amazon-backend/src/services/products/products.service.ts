import type { SortOrder } from "mongoose";
import { Product } from "../../models/product.model.js";
import type { ProductI } from "../../types/product.interface.js";
import { sortTypeManager } from "../../utils/product-sort-manager.util.js";

//TODO: Authorization middleware

export async function getProductsService(): Promise<ProductI[]> {
    return Product.find();
}

export async function getProductsPaginatedService(offset: number, limit: number, sortBy: string): Promise<ProductI[]> {
    const sortMode: Record<string, SortOrder> = sortTypeManager(sortBy);
    return Product.find().sort(sortMode).skip(offset).limit(limit);
}

export async function getProductByIdService(id: string): Promise<ProductI | null> {
    return Product.findById(id);
}

export async function getProductCountService(): Promise<number> {
    return Product.countDocuments();
}

export async function addProductService(body: ProductI): Promise<ProductI> {
    const product: ProductI = {...body, createAt: new Date(), updateAt: new Date()}
    return Product.create(product);
}

export async function updateProductByIdService(id: string, body: ProductI): Promise<ProductI | null> {
    //TODO: unsafe, may change _id
    const product: ProductI = {...body, updateAt: new Date()}
    return Product.findByIdAndUpdate(id, product);
}

export async function deleteProductByIdService(id: string): Promise<void | null> {
    return Product.findByIdAndDelete(id);
}



// export async function addProductBulkService(input: ProductI[]): Promise<ProductI[]> {
//     const products: ProductI[] = input.map((product) => {return {...product, createAt: new Date(), updateAt: new Date()}});
//     return Product.create(products);
// }