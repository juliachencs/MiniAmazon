import { isGuest } from "@/app/utils";
import NavButton from "@/components/NavButtons";
import { useRole } from "@/features/auth/authHooks";

export interface AddToCartButtonProps {
  productId: string;
}
export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { role } = useRole();

  return (
    <NavButton disabled={isGuest(role)} to={`/products/update/${productId}`}>
      Add
    </NavButton>
  );
}
