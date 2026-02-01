import { useAppDispatch } from "@/app/hooks";
import { isGuest } from "@/app/utils";

import { useRole } from "@/features/auth/authHooks";
import { useSelectCountById } from "@/features/cart/cartHooks";
import { cartThunks } from "@/features/cart/cartThunks";
import { Button, InputNumber } from "antd";

export interface AddToCartButtonProps {
  productId: string;
}
export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { role } = useRole();

  // this should not happend
  if (isGuest(role)) {
    <Button type="primary" disabled={isGuest(role)}>
      {"  Add  "}
    </Button>;
  }
  const { count, maxCount } = useSelectCountById(productId);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.addItemToCart(productId));
    console.log("add to cart: ", productId);
  };

  const onChange = (quantity: number) => {
    quantity = Math.ceil(quantity);
    dispatch(cartThunks.updateItemQuantity({ productId: productId, quantity }));
    console.log("update cart: ", productId, quantity);
  };

  return count === 0 ? (
    <Button type="primary" onClick={onClick}>
      {"  Add  "}
    </Button>
  ) : (
    <InputNumber<number>
      mode="spinner"
      value={count}
      min={1}
      max={maxCount}
      disabled={isGuest(role)}
      style={{ width: 150 }}
      onChange={(value) => (value ? onChange(value) : value)}
    ></InputNumber>
  );
}
