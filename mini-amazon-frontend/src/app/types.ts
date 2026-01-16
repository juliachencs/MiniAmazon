
export const allCategories = ['mobile', 'computer', 'desktop'] as const;

export interface ProductFull {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}


export type Product = Omit<ProductFull, "createdAt" | "updatedAt">
export type ProductListItem = Pick<Product, "id" | "name" | "price" | "image_url">;


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