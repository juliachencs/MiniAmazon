import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Product,
  UserAuth,
  UserInfo,
  ListProductsQuery,
  ProductCreated,
  ProductUpdated,
} from "@/app/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5200/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Product"],

  endpoints: (build) => ({
    // auth endpoints
    login: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: UserAuth }) => {
        return response.data;
      },
    }),

    signup: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: UserAuth }) => {
        return response.data;
      },
    }),

    recover: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: "auth/recover",
        method: "POST",
        body: credentials,
      }),
    }),

    signout: build.mutation({
      query: () => ({
        url: "auth/signout",
        method: "POST",
      }),
    }),

    // the product related queries
    listProducts: build.query<Product[], ListProductsQuery>({
      query: ({ offset, limit, sortby }: ListProductsQuery) => ({
        url: `products?offset=${offset}&limit=${limit}&sortby=${sortby}`,
        // providesTags: (result: Product[]) => {
        //   console.log(result);
        //   return result
        //     ? [
        //         ...result.map(({ id }) => ({ type: "Product", id })),
        //         { type: "Product", id: "PARTIAL-LIST" },
        //       ]
        //     : [{ type: "Product", id: "PARTIAL-LIST" }];
        // },
      }),
    }),

    getProduct: build.query<Product, string>({
      query: (id: string) => `products/${id}`,
    }),

    countProducts: build.query<number, void>({
      query: () => "products/count",
    }),

    updateProduct: build.mutation<ProductUpdated, Product>({
      query: (product: Product) => ({
        url: `products/${product.id}`,
        method: "PUT",
        body: product,
      }),
    }), // end updateProduct endpoint

    createProduct: build.mutation<Product, ProductCreated>({
      query: (product: ProductCreated) => ({
        url: `products`,
        method: "POST",
        body: product,
      }),
    }), // end createProduct endpoint
  }), // end definition of all endpoints
});

// export Auth related auto-generated hooks
export const {
  useLoginMutation,
  useSignupMutation,
  useRecoverMutation,
  useSignoutMutation,
} = api;

// export Product related auto-generated hooks
export const {
  useListProductsQuery,
  useGetProductQuery,
  useCountProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = api;
