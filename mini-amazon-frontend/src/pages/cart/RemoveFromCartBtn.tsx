import { Button, InputNumber } from "antd";
import { useAppDispatch, useRole, useSelectCountById } from "@/app/hooks";
import { isGuest } from "@/app/utils";
import { cartThunks } from "@/features/cart/cartthunks";

export interface RemoveFromCartBtnProps {
  productId: string;
}
export default function RemoveFromCartBtn({
  productId,
}: RemoveFromCartBtnProps) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.removeItemFromCart(productId));
    console.log("remove from cart: ", productId);
  };

  return (
    <Button danger onClick={() => onClick()}>
      Remove
    </Button>
  );
}
