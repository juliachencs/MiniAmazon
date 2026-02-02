//Basic success response from the server
export interface BasicResponse {
  success: boolean;
}

//Standard success response with data from the server
export interface ResponseWithData {
  success: true;
  data: unknown;
}

export interface BasicErrorResponse {
  status: number | "UNKONW_ISSUE";
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
export const CATEGORIES = [
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

export const SORT_TYPES = ["Last", "PriceAsc", "PriceDes"] as const;
export type SortType = (typeof SORT_TYPES)[number];

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
export interface CartQuery {
  productId: string;
  quantity: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImgURI: string;
  quantity: number;
  inStockQuant: number;
  priceSnapshot: number;
  recentChangedPrice: boolean;
  recentChangedStock: boolean;
  avaliable: boolean;
  _id: boolean;
}

export interface CartResponse {
  products: CartItem[];
  promoCode: string;
  subTotal: number;
  discount: number;
  total: number;
}
