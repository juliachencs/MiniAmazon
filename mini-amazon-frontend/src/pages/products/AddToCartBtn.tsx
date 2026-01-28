import { Button, InputNumber } from "antd";
import { useAppDispatch, useRole, useSelectCountById } from "@/app/hooks";
import { isGuest } from "@/app/utils";
import { cartThunks } from "@/features/cart/cartthunks";

export interface AddToCartBtnProps {
  productId: string;
}
export default function AddToCartBtn({ productId }: AddToCartBtnProps) {
  const { role } = useRole();
  const { count, maxCount } = useSelectCountById(productId);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.addItemToCart(productId));
    console.log("add to cart: ", productId);
  };

  const onChange = (quantity: number) => {
    dispatch(cartThunks.updateItemQuantity({ productId: productId, quantity }));
    console.log("update cart: ", productId, quantity);
  };

  return count === 0 ? (
    <Button type="primary" disabled={isGuest(role)} onClick={onClick}>
      Add
    </Button>
  ) : (
    <InputNumber
      mode="spinner"
      value={count}
      min={1}
      max={maxCount}
      disabled={isGuest(role)}
      style={{ width: 150 }}
      onChange={(value) => onChange(Math.ceil(value as number))}
    ></InputNumber>
  );
}
