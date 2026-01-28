import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartQuery } from "@/app/types";
import { cartAPI } from "@/features/cart/cartAPI";

// create the thunk actions

const getCart = createAsyncThunk("cart/get", async (_, { getState }) => {
  return await cartAPI.getCart({ getState });
});

const addItemToCart = createAsyncThunk(
  "cart/add",
  async (productId: string, { getState }) => {
    console.log("cartthunks addItemToCart:", args);
    return await cartAPI.addItemToCart(productId, { getState });
  },
);

const updateItemQuantity = createAsyncThunk(
  "cart/update",
  async (args: CartQuery, { getState }) => {
    console.log("cartthunks updateItemQuantity:", args);

    return await cartAPI.updateItemQuantity(args, { getState });
  },
);

const removeItemFromCart = createAsyncThunk(
  "cart/remove",
  async (productId: string, { getState }) => {
    return await cartAPI.removeItemFromCart(productId, { getState });
  },
);

const applyPromotionCode = createAsyncThunk(
  "cart/promo",
  async (promoCode: string, { getState }) => {
    return await cartAPI.applyPromotionCode(promoCode, { getState });
  },
);

export const cartThunks = {
  addItemToCart,
  getCart,
  updateItemQuantity,
  removeItemFromCart,
  applyPromotionCode,
};
