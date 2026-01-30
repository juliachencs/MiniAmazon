import { api } from "@/app/api";
import type { UserAuth, UserInfo } from "@/app/types";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    // auth endpoints
    login: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),

    recover: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: "auth/recover",
        method: "POST",
        body: credentials,
      }),
    }),

    signout: build.mutation<void, void>({
      query: () => ({
        url: "auth/signout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: "throw",
});

// export Auth related auto-generated hooks
export const {
  useLoginMutation,
  useSignupMutation,
  useRecoverMutation,
  useSignoutMutation,
} = authAPI;
