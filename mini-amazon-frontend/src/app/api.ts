import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { ListResponse, ListQuery, ProductFull, UserAuth, UserInfo } from '@/app/types';
import type { Product } from './types';



export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:5200/api/",
    // prepareHeaders: (headers, {getState}) => {
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  tagTypes: ['Products'],

  endpoints: (build) => ({
    login: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: UserAuth}) => {
        return response.data;
      },
    }),

    signup: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
      
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: UserAuth}) => {
        return response.data;
      },
      
    }),

    recover: build.mutation<UserAuth, UserInfo>({
      query: (credentials) => ({
        url: 'auth/recover',
        method: 'POST',
        body: credentials,
      }),
      
    }),

    signout: build.mutation({
      query: () => ({
        url: 'auth/signout',
        method: 'POST',
      }),
    }),

    // the product related queries
    listProducts: build.query<ListResponse<Product>, ListQuery >({
      query: ({offset, limit, sortby}:ListQuery) => ({
        url: `products?offset=${offset}&limit=${limit}&sortby=${sortby}`,
        providesTags: (result) =>{
         console.log(result);
         return result
          ? [ ...result.data.map(({ id }:ProductFull) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'PARTIAL-LIST' },
          ]
        : [{ type: 'Products', id: 'PARTIAL-LIST' }];
        },

      }),
    }),

    getProduct: build.query({
      query: (productId:string) => `/products/${productId}`,
    })
  }),
});

//<, ListQuery,ListResponse<Product>>

export const {useLoginMutation, useSignupMutation, useRecoverMutation, useSignoutMutation} = api
export const {useListProductsQuery, useGetProductQuery} = api
