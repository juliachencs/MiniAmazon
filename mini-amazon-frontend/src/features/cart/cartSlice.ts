import { api } from "@/app/api";
import type { CartResponse } from "@/app/types";
import { cartThunks } from "@/features/cart/cartthunks";
import { createSlice } from "@reduxjs/toolkit";

export type CartMode = "uninitialized" | "loading" | "success" | "error";
export type CartSlice = CartResponse & { mode: CartMode };

const cartSlice = createSlice({
  name: "cart",
  initialState: { mode: "uninitialized" } as CartResponse & {
    mode: "uninitialized" | "loading" | "success" | "error";
  },
  reducers: {},
  extraReducers: (builder) => {
    addCases(builder, cartThunks.getCart);
    addCases(builder, cartThunks.addItemToCart);
    addCases(builder, cartThunks.updateItemQuantity);
    addCases(builder, cartThunks.removeItemFromCart);
    addCases(builder, cartThunks.applyPromotionCode);
    builder.addMatcher(
      api.endpoints.signout.matchFulfilled,
      (state, action) => {
        return { mode: "uninitialized" };
      },
    );
  },
});

// A function to get the initial state from localStorage
const getCart = () => {
  try {
    const persistedState = localStorage.getItem("myAppState");
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  } catch (e) {
    console.warn("Could not load state from localStorage", e);
  }
  // Default initial state if localStorage fails or is empty
  return { value: 0, loading: false };
};

function initialCart() {}
function addCases(builder, thunk) {
  // add item to cart
  builder.addCase(thunk.pending, (state, action) => {
    return { ...state, mode: "loading" };
  });

  builder.addCase(thunk.fulfilled, (state, action) => {
    return { ...state, ...action.payload, mode: "success" };
  });

  builder.addCase(thunk.rejected, (state, action) => {
    return { ...state, mode: "error" };
  });
}

export default cartSlice.reducer;
