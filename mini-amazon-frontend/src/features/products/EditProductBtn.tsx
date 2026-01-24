import { useRole } from "@/app/hooks";
import { isAdmin } from "@/app/utils";
import { Button } from "antd";

export default function EidtProductButton() {
  const { role } = useRole();

  return (
    <Button type="primary" disabled={!isAdmin(role)}>
      Edit
    </Button>
  );
}
