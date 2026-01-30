import type { SortOrder } from "mongoose";
import { Product } from "../../models/product.model.js";
import type { ProductI, ProductView } from "../../types/product.interface.js";
import { sortTypeManager } from "../../utils/product-sort.util.js";


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
    const product: ProductI = { ...body, createAt: new Date(), updateAt: new Date() }
    return Product.create(product);
}

export async function updateProductByIdService(id: string, body: ProductView): Promise<ProductI | null> {
    const product: ProductI = { ...mapProduct(body), updateAt: new Date() }
    return Product.findByIdAndUpdate(id, product);
}

export async function deleteProductByIdService(id: string): Promise<void | null> {
    return Product.findByIdAndDelete(id);
}

// In case given data include _id information
function mapProduct(productUnsafe: ProductView): ProductI {
    // force exclude _id from given data (if exist!)
    const { _id, ...data } = productUnsafe;
    return data;
}


// export async function addProductBulkService(input: ProductI[]): Promise<ProductI[]> {
//     const products: ProductI[] = input.map((product) => {return {...product, createAt: new Date(), updateAt: new Date()}});
//     return Product.create(products);
// }