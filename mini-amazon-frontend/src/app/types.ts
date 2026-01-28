//Basic success response from the server
export interface BasicResponse {
  success: boolean;
}

//Standard success response with datafrom the server
export interface ResponseWithData {
  success: boolean;
  data: unknown;
}

// User auth
export type Role = "Admin" | "Regular";

export interface UserAuth {
  role: Role | null;
  token: string | null;
}

export interface UserInfo {
  email: string;
  pasword: string;
}

// Product
export const allCategories = [
  "Lighting",
  "Plants & planters",
  "Home electronics",
  "Storage & organization",
  "Beds & mattresses",
  "Smart home",
  "Tables & chairs",
  "Home decor & accessories",
  "Kitchen, appliances & supplies",
  "Sofas & armchairs",
] as const;

export type SortType = "Last" | "PriceAsc" | "PriceDes";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  inStockQuant: number;
  imageURI: string;
  createAt: Date;
  updateAt: Date;
}

export type ProductCreated = Omit<Product, "_id" | "createAt" | "updateAt">;

export interface ListProductsQuery {
  offset: number;
  limit: number;
  sortby: SortType;
}

// Cart
export interface CartItem {
  productId: string;
  productName: string;
  productImgURI: string;
  quantity: number;
  inStockQuant: number;
  priceSnapshot: number;
  recentChangedPrice: boolean;
  recentChangedStock: boolean;
}

export interface CartResponse {
  products: CartItem[];
  promoCode: string;
  subtotal: number;
  discount: number;
  total: number;
}

export interface CartQuery {
  productId: string;
  quantity: number;
}
// ERROR
export type ErrorCode =
  | "AUTH_FAILED"
  | "NETWORK_ERROR"
  | "NO_PRODUCT"
  | "UNKOWN"
  | "NO_PERMISSION";
