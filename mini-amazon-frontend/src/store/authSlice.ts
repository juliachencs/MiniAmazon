import {createSlice} from '@reduxjs/toolkit'
import {type UserAuth} from "../types"
import {api} from "../store/api"
import { useMemo } from 'react';

const authSlice = createSlice({
  name: 'auth',
  initialState: { role: "guest", token: null } as UserAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.role = payload.role
      },
    );

    builder.addMatcher(
      api.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.role = payload.role
      },
    );
    
    builder.addMatcher(
      api.endpoints.signout.matchFulfilled,
      (state) => {
        console.log("matcher: signout")
        state.token = "guest"
        state.role = null
        console.log(state.token, state.role)
      },
    );

  },
})


export default authSlice.reducer

