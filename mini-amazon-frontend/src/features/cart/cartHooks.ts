import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartThunks";

import { useEffect, useMemo } from "react";

export function useCart(force: boolean = false) {
  const mode = useAppSelector((state) => state.cart.mode);
  const data = useAppSelector((state) => state.cart.data);
  const error = useAppSelector((state) => state.cart.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mode === "idle" || force) {
      console.log("dispatch query cart");
      dispatch(cartThunks.getCart());
    }
  }, [mode, dispatch, force]);

  return useMemo(() => ({ mode, data, error }), [mode, data, error]);
}

export function useCartItemsCount() {
  // retrieve data from store
  const { mode, data } = useCart();

  const count = data
    ? data.products.reduce(
        (prev, p) => prev + (p.available ? p.quantity : 0),
        0,
      )
    : 0;

  return useMemo(() => ({ status: mode, count: count }), [mode, count]);
}

export const useIsInCart = (productId: string) => {
  const { data } = useCart();

  if (data) {
    return data.products.some((item) => item.productId === productId);
  }
  return false;
};

export const useSelectById = (productId: string) => {
  let count = 0;
  let maxCount = 0;
  let _id = "";

  const { data } = useCart();

  if (data) {
    const foundItem = data.products.find(
      (item) => item.productId === productId,
    );
    count = foundItem ? foundItem.quantity : 0;
    maxCount = foundItem ? foundItem.inStockQuant : 0;
    // BUG
    _id = foundItem ? foundItem._id : "undefined";
  }

  return useMemo(() => ({ count, maxCount, _id }), [count, maxCount, _id]);
};
