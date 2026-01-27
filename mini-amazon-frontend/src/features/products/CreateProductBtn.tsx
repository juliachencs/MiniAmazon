import { Button } from "antd";

import { useRole } from "@/app/hooks";
import { isAdmin } from "@/app/utils";
import LinkButton from "@/components/LinkButton";

export default function CreateProductBtn() {
  const { role } = useRole();

  return (
    <LinkButton to="/products/create" disabled={!isAdmin(role)}>
      Create Product
    </LinkButton>
  );
}
