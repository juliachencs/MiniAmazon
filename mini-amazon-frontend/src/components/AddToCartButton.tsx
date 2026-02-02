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
  const { count, maxCount, _id } = useSelectCountById(productId);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.addItemToCart(productId));
  };
  if (count === 0) {
    return (
      <Button type="primary" onClick={onClick}>
        {"  Add  "}
      </Button>
    );
  }

  const onChange = (quantity: number) => {
    quantity = Math.ceil(quantity);
    dispatch(cartThunks.updateItemQuantity({ _id, quantity }));
  };

  return (
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
