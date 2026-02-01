import { useCart } from "@/features/cart/cartHooks";
import ShoppingCartForm from "@/components/cart/ShoppingCartForm";

export default function ShoppingCart() {
  const { mode, data: cart } = useCart();

  if (mode === "error") {
    return <div>Error loading cart. Please try again.</div>;
  }
  if (mode === "idle") {
    return <div>Cart is uninitialized.</div>;
  }
  console.log(mode, cart);

  return (
    <div style={{ opacity: mode === "loading" ? 0.5 : 1 }}>
      {cart && <ShoppingCartForm {...cart}></ShoppingCartForm>}
    </div>
  );
}
