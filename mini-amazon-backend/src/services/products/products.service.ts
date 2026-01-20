import { Product } from "../../models/product.model.js";
import type { ProductI } from "../../types/product.interface.js";
import type { SortType } from "../../types/sortType.enum.js";

export async function getProductsService(): Promise<ProductI[]> {
    return Product.find();
}

export async function getProductsPaginatedService(offset: number, limit: number, sortBy: SortType): Promise<void> {
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
    const product: ProductI = {...body, updateAt: new Date()}
    return Product.findByIdAndUpdate(id, product);
}

export async function deleteProductByIdService(id: string): Promise<void | null> {
    return Product.findByIdAndDelete(id);
}


// export async function addProductBulkService(products: ProductI[]): Promise<ProductI[]> {
//     return Product.create(products);
// }