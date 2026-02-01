import { Card, Space } from "antd";
import type { Product } from "@/app/types";
import { Link } from "react-router-dom";
import EditProductButton from "@/components/product/EditProductButton";
import AddToCartButton from "@/components/AddToCartButton";
const { Meta } = Card;

export function ProductCard({ _id, name, price, imageURI }: Product) {
  return (
    <Card
      style={{ height: 400, width: 256 }}
      cover=<img style={{ height: 256, width: 256 }} src={imageURI} />
    >
      <Link to={`/products/item/${_id}`}>
        <Meta title={name} description={price} />
      </Link>
      <Space>
        <AddToCartButton productId={_id} />
        <EditProductButton productId={_id} />
      </Space>
    </Card>
  );
}
