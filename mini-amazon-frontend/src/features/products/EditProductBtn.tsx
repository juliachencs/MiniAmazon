import { Button } from "antd";
import { useAuth } from "../../app/store";

export default function EidtProductButton() {
  const { role } = useAuth();
  console.log(role);

  return (
    <Button type="primary" disabled={role !== "Admin"}>
      {" "}
      Edit{" "}
    </Button>
  );
}
