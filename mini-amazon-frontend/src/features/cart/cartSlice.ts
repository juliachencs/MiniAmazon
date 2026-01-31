import type { BasicErrorResponse, CartResponse } from "@/app/types";
import { authAPI } from "@/features/auth/authAPI";
import { cartThunks } from "@/features/cart/cartThunks";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

export type CartMode = "idle" | "loading" | "success" | "error";
export type CartState = {
  data: CartResponse | null;
  error: BasicErrorResponse | null;
  mode: CartMode;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    error: null,
    mode: "idle",
  } as CartState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(...Object.values(cartThunks).map((thunk) => thunk.pending)),
      (state) => {
        state.mode = "loading";
      },
    );

    builder.addMatcher(
      isAnyOf(...Object.values(cartThunks).map((thunk) => thunk.fulfilled)),
      (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.mode = "success";
      },
    );

    builder.addMatcher(
      isAnyOf(...Object.values(cartThunks).map((thunk) => thunk.rejected)),
      (state, action) => {
        state.mode = "error";
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { status: "UNKONW_ISSUE" };
        }
      },
    );

    // clear cart state when user logout
    builder.addMatcher(authAPI.endpoints.signout.matchFulfilled, (state) => {
      state.mode = "idle";
      state.data = null;
      state.error = null;
    });
  },
});

export default cartSlice.reducer;
