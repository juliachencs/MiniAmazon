import { Button } from "antd";
import { useRole } from "@/app/hooks";
import { isGuest } from "@/app/utils";

export interface AddToCartBtnProps {
  productId: string;
}
export default function AddToCartBtn({ productId }: AddToCartBtnProps) {
  const { role } = useRole();

  const onClick = () => {
    console.log("add to cart: ", productId);
  };
  return (
    <Button type="primary" disabled={isGuest(role)} onClick={onClick}>
      Add
    </Button>
  );
}
