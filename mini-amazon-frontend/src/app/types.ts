// User auth
export type Role = "ADMIN" | "REGULAR";

export interface UserAuth {
  role: Role | null;
  token: string | null;
}

export interface UserInfo {
  email: string;
  pasword: string;
}

// Product
export const allCategories = ["mobile", "computer", "desktop"] as const;
export type SortType = "Last" | "PriceAsc" | "PriceDes";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  inStockQuant: number;
  imageURI: string;
  createAt: Date;
  updateAt: Date;
}

export type ProductCreated = Omit<Product, "id" | "createAt" | "updateAt">;
export type ProductUpdated = Omit<Product, "id"> | { _id: string };

export interface ListProductsQuery {
  offset: number;
  limit: number;
  sortby: SortType;
}

// ERROR
export type ErrorCode =
  | "AUTH_FAILED"
  | "NETWORK_ERROR"
  | "NO_PRODUCT"
  | "UNKOWN"
  | "NO_PERMISSION";
