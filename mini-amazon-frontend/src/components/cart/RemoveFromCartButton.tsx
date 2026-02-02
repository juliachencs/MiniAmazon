import { Button, Tooltip } from "antd";
import { useAppDispatch } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartThunks";
export interface RemoveFromCartBtnProps {
  productId: string;
  _id: string;
}
export default function RemoveFromCartButton({
  productId,
  _id,
}: RemoveFromCartBtnProps) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    //BUG
    dispatch(cartThunks.removeItemFromCart(productId));
  };

  return (
    <Tooltip title="Take this out of your cart">
      <Button danger onClick={() => onClick()}>
        Remove
      </Button>
    </Tooltip>
  );
}
