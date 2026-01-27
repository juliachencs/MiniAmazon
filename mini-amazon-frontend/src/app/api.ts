import { createApi } from "@reduxjs/toolkit/query/react";

import type {
  Product,
  UserAuth,
  UserInfo,
  ListProductsQuery,
  ProductCreated,
  BasicResponse,
} from "@/app/types";
import { customBaseQuery } from "@/app/service";

export const api = createApi({
  baseQuery: customBaseQuery,
  tagTypes: ["Product"],
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
        providesTags: (result: Product[]) => {
          console.log(result);
          return result
            ? [
                ...result.map(({ _id }) => ({ type: "Product", id: _id })),
                { type: "Product", id: "PARTIAL-LIST" },
              ]
            : [{ type: "Product", id: "PARTIAL-LIST" }];
        },
      }),
    }),

    getProduct: build.query<Product, string>({
      query: (id: string) => `products/${id}`,
    }),

    countProducts: build.query<number, void>({
      query: () => "products/count",
    }),

    updateProduct: build.mutation<Product, Product>({
      query: (product: Product) => ({
        url: `products/${product._id}`,
        method: "PUT",
        body: product,
      }),

      invalidatesTags: (result) => {
        let tags = [{ type: "Product", id: "PARTIAL-LIST" }];
        if (result) {
          tags = [...tags, { type: "Product", id: result._id }];
        }
        return tags;
      },
    }), // end updateProduct endpoint

    deleteProduct: build.mutation<BasicResponse, string>({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, args) => {
        let tags = [{ type: "Product", id: "PARTIAL-LIST" }];
        console.log(args);
        if (result) {
          tags = [...tags, { type: "Product", id: args }];
        }
        return tags;
      },
    }),

    createProduct: build.mutation<Product, ProductCreated>({
      query: (product: ProductCreated) => ({
        url: `products`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Product", id: "PARTIAL-LIST" }],
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
  useDeleteProductMutation,
} = api;
