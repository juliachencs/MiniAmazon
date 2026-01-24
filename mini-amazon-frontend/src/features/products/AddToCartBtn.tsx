import { Button } from "antd";
import { useRole } from "@/app/hooks";
import { isGuest } from "@/app/utils";

export default function AddToCartBtn() {
  const { role } = useRole();
  return (
    <Button type="primary" disabled={isGuest(role)}>
      Add
    </Button>
  );
}
