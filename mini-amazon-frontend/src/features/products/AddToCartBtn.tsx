import { Button } from "antd";
import { useAuth } from "../../app/store";

export default function AddToCartBtn() {
  const { role } = useAuth();
  console.log(role);

  return (
    <Button type="primary" disabled={!role}>
      {" "}
      Add{" "}
    </Button>
  );
}
