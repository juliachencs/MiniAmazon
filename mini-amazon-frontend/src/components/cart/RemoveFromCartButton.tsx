import { Button, Tooltip } from "antd";
import { useAppDispatch } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartThunks";
export interface RemoveFromCartBtnProps {
  productId: string;
}
export default function RemoveFromCartButton({
  productId,
}: RemoveFromCartBtnProps) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.removeItemFromCart(productId));
    console.log("remove from cart: ", productId);
  };

  return (
    <Tooltip title="Take this out of your cart">
      <Button danger onClick={() => onClick()}>
        Remove
      </Button>
    </Tooltip>
  );
}
