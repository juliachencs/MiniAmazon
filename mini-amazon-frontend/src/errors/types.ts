export type QueryErrorCode = number | string; // 400 | 401| 404 | 403 | 409 | 500 | "FETCH_ERROR" | "UNKOWN_ISSUE";
export type QueryErrorAction = "HOME" | "REFRESH" | "LOGIN" | "BACK" | "CANCEL";

export interface QueryErrorInterface {
  status: QueryErrorCode; //
  issue: string; // describe the issue we are facing
  cause: string; // explain what the cause of the issue
  message: string; // give some suggestions on the issue
  actions: QueryErrorAction[];
}

export interface QueryErrorDetails {
  cause: string; // explain what the cause of the issue
  message: string; // give some suggestions on the issue
  actions: QueryErrorAction[];
}
export type AuthQueryTask = "LOGIN" | "SIGNUP" | "SIGNOUT" | "RECOVER";

export type ProductQueryTask =
  | "GET_PRODUCTS"
  | "GET_PRODUCT"
  | "GET_PRODUCT_COUNT";

export type ProductEditQueryTask =
  | "CREATE_PRODUCT"
  | "UPDATE_PRODUCT"
  | "DELETE_PRODUCT";

export type CartEditQueryTask = "ADD_ITEM" | "UPDATE_ITEM" | "DELETE_ITEM";
export type CartQueryTask = "QUERY_CART";
export type CartPromoQueryTask = "APPLY_PROMO";
