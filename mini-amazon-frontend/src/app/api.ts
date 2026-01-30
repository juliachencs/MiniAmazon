import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { isResponseWithData } from "@/app/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5200/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Refernce https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
// unwrap the data field from success response
const customBaseQuery: BaseQueryFn<
  string | FetchArgs, // type of args
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (Object.hasOwn(result, "data") && isResponseWithData(result.data)) {
    result.data = result.data.data;
  }

  if (Object.hasOwn(result, "error")) {
    console.log(result.error);
  }
  return result;
};

export const api = createApi({
  baseQuery: customBaseQuery,
  tagTypes: ["Product"],
  endpoints: () => ({}), // Start with an empty object
});
