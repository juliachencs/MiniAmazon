import type { CartResponse } from "@/app/types";
import { cartThunks } from "@/features/cart/cartthunks";
import { createSlice } from "@reduxjs/toolkit";

function addCases(builder, thunk) {
  // add item to cart
  builder.addCase(thunk.pending, (state, action) => {
    return { ...state, status: "loading" };
    // logic to add item to cart
  });

  builder.addCase(thunk.fulfilled, (state, action) => {
    // logic to add item to cart
    return { ...state, ...action.payload, status: "success" };
  });

  builder.addCase(thunk.rejected, (state, action) => {
    // logic to add item to cart
    return { ...state, status: "error" };
  });
}

const cartSlice = createSlice({
  name: "cart",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    addCases(builder, cartThunks.getCart);
    addCases(builder, cartThunks.addItemToCart);
    addCases(builder, cartThunks.updateItemQuantity);
    addCases(builder, cartThunks.removeItemFromCart);
  },
});

export default cartSlice.reducer;
