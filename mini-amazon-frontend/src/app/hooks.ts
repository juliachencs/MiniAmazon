import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { useMemo } from "react";

// Use throughout your app instead of plain useDispath and useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useRole = () => {
  const role = useAppSelector((state: RootState) => state.auth.role);
  return useMemo(() => ({ role }), [role]);
};

export const useToken = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  return useMemo(() => ({ token }), [token]);
};

export const useCart = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  return useMemo(() => ({ cart }), [cart]);
};

export const useCartItemCount = () => {
  const cartItems = useAppSelector(
    (state: RootState) => state.cart.products || [],
  );
  const mode = useAppSelector((state: RootState) => state.cart.mode);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return {
    count,
    mode,
  };
};

export const useSelectCountById = (productId: string) => {
  const foundItem = useAppSelector((state: RootState) =>
    state.cart.products?.find((item) => item.productId === productId),
  );
  const count = foundItem ? foundItem.quantity : 0;
  const inStockQuant = foundItem ? foundItem.inStockQuant : 0;
  return { count, maxCount: inStockQuant };
};
