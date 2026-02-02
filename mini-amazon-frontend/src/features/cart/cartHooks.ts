import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartThunks";

import { useEffect, useMemo } from "react";

export function useCart() {
  const mode = useAppSelector((state) => state.cart.mode);
  const data = useAppSelector((state) => state.cart.data);
  const error = useAppSelector((state) => state.cart.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mode === "idle") {
      console.log("dispatch query cart");
      dispatch(cartThunks.getCart());
    }
  }, [mode, dispatch]);

  return useMemo(() => ({ mode, data, error }), [mode, data, error]);
}

export function useCartItemsCount() {
  // retrieve data from store
  const { mode, data } = useCart();

  const count = data
    ? data.products.reduce(
        (prev, p) => prev + (p.avaliable ? p.quantity : 0),
        0,
      )
    : 0;

  return useMemo(() => ({ status: mode, count: count }), [mode, count]);
}

export const useSelectCountById = (productId: string) => {
  const { data } = useCart();
  let foundItem = null;
  if (data) {
    foundItem = data.products.find((item) => item.productId === productId);
  }

  const count = foundItem ? foundItem.quantity : 0;
  const maxCount = foundItem ? foundItem.inStockQuant : 0;
  const _id = foundItem ? foundItem.inStockQuant : "undefined";
  return useMemo(() => ({ count, maxCount, _id }), [count, maxCount, _id]);
};
