import { useCart, useAppDispatch } from "@/app/hooks";
import { cartThunks } from "@/features/cart/cartthunks";
import { useEffect } from "react";

export default function ShoppingCart() {
  const { cart } = useCart();
  const { mode } = cart;
  console.log("ShoppingCart render, mode=", mode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartThunks.getCart());
  }, [dispatch]);

  if (mode === "loading") {
    return <div>Loading cart...</div>;
  }

  if (mode === "error") {
    return <div>Error loading cart. Please try again.</div>;
  }
  if (mode === "uninitialized") {
    return <div>Cart is uninitialized.</div>;
  }
  const { products, subtotal, discount, total } = cart;
  return (
    <div>
      Shopping Cart Page
      <div>Status: {mode}</div>
      <div>
        {products?.map((item) => (
          <div key={item.productId}>
            <span>{item.productName}</span>
          </div>
        ))}
      </div>
      <div>Subtotal: ${subtotal}</div>
      <div>Discount: ${discount}</div>
      <div>Total: ${total}</div>
    </div>
  );
}
