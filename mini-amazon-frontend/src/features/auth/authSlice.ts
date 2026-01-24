import { createSlice } from "@reduxjs/toolkit";
import { type UserAuth } from "@/app/types";
import { api } from "@/app/api";

const authSlice = createSlice({
  name: "auth",
  initialState: { role: null, token: null } as UserAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.role = payload.role;
        console.log(
          "auth-extra-reducer::login::fullfilled:",
          state.token,
          state.role,
        );
      },
    );

    builder.addMatcher(
      api.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.role = payload.role;
        console.log(
          "auth-extra-reducer::signup::fullfilled:",
          state.token,
          state.role,
        );
      },
    );

    builder.addMatcher(api.endpoints.signout.matchFulfilled, (state) => {
      console.log("matcher: signout");
      state.token = null;
      state.role = null;
      console.log(
        "auth-extra-reducer::signout::fullfilled:",
        state.token,
        state.role,
      );
    });
  },
});

export default authSlice.reducer;
