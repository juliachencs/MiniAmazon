import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { isResponseWithData } from "@/app/utils";
import type { BasicErrorResponse } from "@/app/types";

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
  unknown, // type of result
  BasicErrorResponse //type of Error
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (Object.hasOwn(result, "data") && isResponseWithData(result.data)) {
    result.data = result.data.data;
  }

  if ("error" in result) {
    console.log(result.error);
    const error: BasicErrorResponse = { status: "UNKOWN_ISSUE" };
    if (
      typeof result.error === "object" &&
      result.error != null &&
      "status" in result.error &&
      (result.error.status === "FETCH_ERROR" ||
        typeof result.error.status === "number")
    ) {
      error.status = result.error.status;
    }

    return { error };
  }
  return result;
};

export const api = createApi({
  baseQuery: customBaseQuery,
  tagTypes: ["Product"],
  endpoints: () => ({}), // Start with an empty object
});
