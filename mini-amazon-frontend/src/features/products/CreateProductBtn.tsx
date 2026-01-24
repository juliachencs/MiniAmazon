import { Button } from "antd";

import { useRole } from "@/app/hooks";
import { isAdmin } from "@/app/utils";

export default function CreateProductBtn() {
  const { role } = useRole();

  return (
    <Button href="/products/create" disabled={!isAdmin(role)}>
      Create Product
    </Button>
  );
}
