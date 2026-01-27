import { createSlice } from "@reduxjs/toolkit";
import { type UserAuth } from "@/app/types";
import { api } from "@/app/api";

const saveAuth = (auth: UserAuth): void => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

const loadAuth = (): UserAuth => {
  const auth = localStorage.getItem("auth");
  return auth
    ? (JSON.parse(auth) as UserAuth)
    : ({ role: null, token: null } as UserAuth);
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.role = payload.role;
        saveAuth(state);

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
        saveAuth(state);

        console.log(
          "auth-extra-reducer::signup::fullfilled:",
          state.token,
          state.role,
        );
      },
    );

    builder.addMatcher(api.endpoints.signout.matchFulfilled, (state) => {
      state.token = null;
      state.role = null;
      saveAuth(state);
      console.log(
        "auth-extra-reducer::signout::fullfilled:",
        state.token,
        state.role,
      );
    });
  },
});

export default authSlice.reducer;
