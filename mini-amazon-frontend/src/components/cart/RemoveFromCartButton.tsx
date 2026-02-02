import { Button, Tooltip } from "antd";
import { useAppDispatch } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartThunks";
export interface RemoveFromCartBtnProps {
  _id: string;
}
export default function RemoveFromCartButton({ _id }: RemoveFromCartBtnProps) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.removeItemFromCart(_id));
    console.log("remove from cart: ", _id);
  };

  return (
    <Tooltip title="Take this out of your cart">
      <Button danger onClick={() => onClick()}>
        Remove
      </Button>
    </Tooltip>
  );
}
