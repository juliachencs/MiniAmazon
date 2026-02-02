import { Card, Space } from "antd";
import type { Product } from "@/app/types";
import { Link } from "react-router-dom";
import EditProductButton from "@/components/product/EditProductButton";
import AddToCartButton from "@/components/AddToCartButton";
import { useRole } from "@/features/auth/authHooks";
import { isAdmin, isGuest } from "@/app/utils";
const { Meta } = Card;

export function ProductCard({ _id, name, price, imageURI }: Product) {
  const { role } = useRole();

  return (
    <Card
      style={{ height: 400, width: 256 }}
      cover=<img style={{ height: 256, width: 256 }} src={imageURI} />
    >
      <Link to={`/products/item/${_id}`}>
        <Meta title={name} description={price} />
      </Link>
      <Space>
        {!isGuest(role) && <AddToCartButton productId={_id} />}
        {isAdmin(role) && <EditProductButton productId={_id} />}
      </Space>
    </Card>
  );
}
