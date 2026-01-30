//Basic success response from the server
export interface BasicResponse {
  success: boolean;
}

//Standard success response with data from the server
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
