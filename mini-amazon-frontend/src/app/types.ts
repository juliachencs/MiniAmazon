
// User auth
export type Role = 'admin' | 'regular' ;

export interface UserAuth{
  role: Role | null;
  token: string | null
}


export interface UserInfo{
  email: string
  pasword: string
}


// Product
export const allCategories = ['mobile', 'computer', 'desktop'] as const;
export type SortType = 'Last' | 'PriceAsc' | 'PriceDes';

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


// ERROR
export type ErrorCode =
  | "AUTH_FAILED"
  | "NETWORK_ERROR"
  | "NO_PRODUCT"
  | "UNKOWN"
  | "NO_PERMISSION";


// export interface ListResponse<T> {
//   total: number; // the total number of products
//   data: T[];
// }

// export interface ListQuery{
//   offset: number;
//   limit: number;
//   sortby: SortType;
// }
  



