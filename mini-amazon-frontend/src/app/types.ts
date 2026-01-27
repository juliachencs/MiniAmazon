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

//Standard success response from the server
export interface BasicResponse {
  success: boolean;
}
//Standard success response from the server
export interface ResponseWithData {
  success: boolean;
  data: unknown;
}

// ERROR
export type ErrorCode =
  | "AUTH_FAILED"
  | "NETWORK_ERROR"
  | "NO_PRODUCT"
  | "UNKOWN"
  | "NO_PERMISSION";
