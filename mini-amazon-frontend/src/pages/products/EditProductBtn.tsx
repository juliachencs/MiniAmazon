import { useRole } from "@/app/hooks";
import { isAdmin } from "@/app/utils";
import LinkButton from "@/components/LinkButton";

export interface EidtProductBtnProps {
  productId: string;
}
export default function EidtProductButton({ productId }: EidtProductBtnProps) {
  const { role } = useRole();

  return (
    <LinkButton
      type="primary"
      disabled={!isAdmin(role)}
      to={`/products/update/${productId}`}
    >
      Edit
    </LinkButton>
  );
}
