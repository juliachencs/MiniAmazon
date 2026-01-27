import { Card } from "antd";
import { Link } from "react-router-dom";
import type { Product } from "@/app/types";
import { MakeProductLink } from "@/app/utils";
import AddToCartBtn from "@/pages/products/AddToCartBtn";
import EditProductBtn from "@/pages/products/EditProductBtn";

const { Meta } = Card;

export function ProductCard({ _id, name, price, imageURI }: Product) {
  return (
    <Card
      hoverable
      style={{ height: 400, width: 256 }}
      cover=<Link to={MakeProductLink(_id)}>
        {" "}
        <img style={{ height: 256, width: 256 }} src={imageURI} />{" "}
      </Link>
    >
      <Meta title={name} description={price} />
      <AddToCartBtn productId={_id} /> <EditProductBtn productId={_id} />
    </Card>
  );
}
