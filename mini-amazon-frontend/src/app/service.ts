import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { isResponseWithData } from "@/app/utils";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5200/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Refernce https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
// unwrap the data field from success response
export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
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
// Reference:
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-basequery
// export type BaseQueryFn<
//   Args = any,
//   Result = unknown,
//   Error = unknown,
//   DefinitionExtraOptions = {},
//   Meta = {},
// > = (
//   args: Args,
//   api: BaseQueryApi,
//   extraOptions: DefinitionExtraOptions,
// ) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;
