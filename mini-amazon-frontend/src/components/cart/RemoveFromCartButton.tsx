import { Button, Popconfirm } from "antd";
import { useAppDispatch } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartThunks";
export interface RemoveFromCartBtnProps {
  _id: string;
}
export default function RemoveFromCartButton({ _id }: RemoveFromCartBtnProps) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    //BUG
    dispatch(cartThunks.removeItemFromCart(_id));
  };

  return (
    <Popconfirm
      title="Are you sure to remove this product?"
      description="This product will be removed from your shopping cart!"
      onConfirm={() => onClick()}
    >
      <Button danger>Remove</Button>
    </Popconfirm>
  );
}
