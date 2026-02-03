import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authAPI } from "@/features/auth/authAPI";
import { cartThunks } from "@/features/cart/cartThunks";
import { message } from "antd";

import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function useCart() {
  const mode = useAppSelector((state) => state.cart.mode);
  const data = useAppSelector((state) => state.cart.data);
  const error = useAppSelector((state) => state.cart.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mode === "idle") {
      console.log("dispatch query cart");
      dispatch(cartThunks.getCart());
    }
  }, [mode, dispatch]);

  useEffect(() => {
    if (error?.status === 401) {
      dispatch(authAPI.endpoints.signout.initiate()).then(() => {
        message.warning(
          "Your login session is expired! We have signed you out. Please sigin in again",
        );
        navigate("/login");
      });

      console.log("enconter 401");
    }
  }, [error, dispatch, navigate]);

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
