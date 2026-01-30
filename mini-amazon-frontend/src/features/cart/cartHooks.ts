import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { cartThunks } from "@/features/cart/cartthunks";
import { useEffect, useMemo, useState } from "react";

export const useCart = () => {
  const cart = useAppSelector((state) => state.cart);
  return useMemo(() => ({ cart }), [cart]);
};

export const useCartTotalItems = () => {
  const [count, setCount] = useState(0);
  const [isloading, setIsLoading] = useState(true);

  const mode = useAppSelector((state) => state.cart.mode);
  const products = useAppSelector((state) => state.cart.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("In useCartItemCount: ", mode);
    if (mode === "uninitialized") {
      dispatch(cartThunks.getCart());
    } else {
      setCount(products.reduce((cumsum, item) => cumsum + item.quantity));
    }
  }, [mode, products]);

  return {
    count,
    mode,
  };
};

export const useSelectCountById = (productId: string) => {
  const foundItem = useAppSelector((state) =>
    state.cart.products?.find((item) => item.productId === productId),
  );

  const count = foundItem ? foundItem.quantity : 0;
  const inStockQuant = foundItem ? foundItem.inStockQuant : 0;
  return { count, maxCount: inStockQuant };
};
