import { isAdmin } from "@/app/utils";
import NavButton from "@/components/NavButtons";
import { useRole } from "@/features/auth/authHooks";

export interface EidtProductBtnProps {
  productId: string;
}
export default function EidtProductButton({ productId }: EidtProductBtnProps) {
  const { role } = useRole();

  return (
    <NavButton
      style={{ width: "64px" }}
      disabled={!isAdmin(role)}
      to={`/products/update/${productId}`}
    >
      Edit
    </NavButton>
  );
}
