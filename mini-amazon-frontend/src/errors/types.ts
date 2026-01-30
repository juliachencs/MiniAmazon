export type QueryErrorCode = number | string; // 400 | 404 | 403 | 409 | 500 | "FETCH_ERROR";
export type QueryErrorAction = "HOME" | "REFRESH" | "LOGIN" | "CANCEL" | "BACK";
export type AuthQueryTask = "LOGIN" | "SIGNUP" | "SIGNOUT" | "RECOVER";

export interface ErrorDetail {
  issue: string;
  cause: string;
  message: string;
  actions: QueryErrorAction[];
}

export type ProductQueryTask = "";
