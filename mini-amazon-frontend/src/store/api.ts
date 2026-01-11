import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { UserAuth, UserInfo } from '../types';
//import { type RootState }  from '../store/store' ;

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

  })
});

export const {useLoginMutation, useSignupMutation, useRecoverMutation, useSignoutMutation} = api
