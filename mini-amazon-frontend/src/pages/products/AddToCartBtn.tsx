import { Button } from "antd";
import { useAppDispatch, useRole } from "@/app/hooks";
import { isGuest } from "@/app/utils";
import { cartThunks } from "@/features/cart/cartthunks";

export interface AddToCartBtnProps {
  productId: string;
}
export default function AddToCartBtn({ productId }: AddToCartBtnProps) {
  const { role } = useRole();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cartThunks.addItemToCart({ productId: productId, quantity: 1 }));
    console.log("add to cart: ", productId);
  };
  return (
    <Button type="primary" disabled={isGuest(role)} onClick={onClick}>
      Add
    </Button>
  );
}
