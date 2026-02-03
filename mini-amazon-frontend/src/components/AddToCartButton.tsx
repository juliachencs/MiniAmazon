import { useAppDispatch } from "@/app/hooks";
import { isGuest } from "@/app/utils";

import { useRole } from "@/features/auth/authHooks";
import { useIsInCart, useSelectById } from "@/features/cart/cartHooks";
import { cartThunks } from "@/features/cart/cartThunks";
import { Button, InputNumber } from "antd";

interface AddToCartButtonProps {
  productId: string;
}

function AddButton({ productId }: AddToCartButtonProps) {
  const { role } = useRole();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.addItemToCart(productId));
  };

  return (
    <Button type="primary" disabled={isGuest(role)} onClick={onClick}>
      {"  Add  "}
    </Button>
  );
}

export function UpdateItemButton({ productId }: { productId: string }) {
  const { role } = useRole();
  const { count, maxCount, _id } = useSelectById(productId);
  const dispatch = useAppDispatch();

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

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { role } = useRole();

  // this should not happend
  if (isGuest(role)) {
    <Button type="primary" disabled={isGuest(role)}>
      {"  Add  "}
    </Button>;
  }

  const incart = useIsInCart(productId);
  if (incart) {
    return <UpdateItemButton productId={productId} />;
  }
  return <AddButton productId={productId} />;
}
