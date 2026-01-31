import type { BasicErrorResponse, CartResponse } from "@/app/types";
import { authAPI } from "@/features/auth/authAPI";
import { cartThunks } from "@/features/cart/cartthunks";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { act } from "react";

export type CartMode = "uninitialized" | "loading" | "success" | "error";
export type CartState = {
  data: CartResponse | null;
  currentData: CartResponse | null;
  error: BasicErrorResponse | null;
  mode: CartMode;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    currentData: null,
    error: null,
    mode: "uninitialized",
  } as CartState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(...Object.values(cartThunks).map((thunk) => thunk.pending)),
      (state) => {
        state.currentData = null;
        state.error = null;
        state.mode = "loading";
      },
    );

    builder.addMatcher(
      isAnyOf(...Object.values(cartThunks).map((thunk) => thunk.fulfilled)),
      (state, action) => {
        state.data = action.payload;
        state.currentData = action.payload;
        state.error = null;
        state.mode = "success";
      },
    );

    builder.addMatcher(
      isAnyOf(...Object.values(cartThunks).map((thunk) => thunk.rejected)),
      (state, action) => {
        state.mode = "error";
        state.currentData = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { status: "UNKONW_ISSUE" };
        }
      },
    );

    builder.addMatcher(authAPI.endpoints.signout.matchFulfilled, (state) => {
      state.mode = "uninitialized";
      state.data = null;
      state.currentData = null;
    });
  },
});

export default cartSlice.reducer;
