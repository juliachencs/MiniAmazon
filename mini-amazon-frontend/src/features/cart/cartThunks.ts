import type { CartQuery } from "@/app/types";
import { cartAPI } from "@/features/cart/cartAPI";
import { createAppAsyncThunk, type ThunkAPI } from "@/app/hooks";

const getCart = createAppAsyncThunk("cart/get", async (_, api: ThunkAPI) => {
  return await cartAPI.getCart(api);
});

const addItemToCart = createAppAsyncThunk(
  "cart/add",
  async (productId: string, api) => {
    return await cartAPI.addItemToCart(productId, api);
  },
);

const updateItemQuantity = createAppAsyncThunk(
  "cart/update",
  async (args: CartQuery, api) => {
    console.log("cartthunks updateItemQuantity:", args);

    return await cartAPI.updateItemQuantity(args, api);
  },
);

const removeItemFromCart = createAppAsyncThunk(
  "cart/remove",
  async (productId: string, api) => {
    return await cartAPI.removeItemFromCart(productId, api);
  },
);

const applyPromotionCode = createAppAsyncThunk(
  "cart/promo",
  async (promoCode: string, api) => {
    return await cartAPI.applyPromotionCode(promoCode, api);
  },
);

export const cartThunks = {
  addItemToCart,
  getCart,
  updateItemQuantity,
  removeItemFromCart,
  applyPromotionCode,
};
