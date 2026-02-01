import { useAppSelector } from "@/app/hooks";

import { useMemo } from "react";

export const useSelectCountById = (productId: string) => {
  const foundItem = useAppSelector((state) =>
    state.cart.data?.products.find((item) => item.productId === productId),
  );
  const count = foundItem ? foundItem.quantity : 0;
  const maxCount = foundItem ? foundItem.inStockQuant : 0;
  return useMemo(() => ({ count, maxCount }), [count, maxCount]);
};
