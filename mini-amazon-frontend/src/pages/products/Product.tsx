import { useGetProductQuery } from "@/app/api"; // adjust the import path as needed
import { useParams } from "react-router-dom";

import { Typography, Image, Flex, Spin } from "antd";
import AddToCartBtn from "@/pages/products/AddToCartBtn";
import EidtProductButton from "@/pages/products/EditProductBtn";

export default function Product() {
  const { productId } = useParams();
  const {
    data: product,
    currentData,
    isFetching,
    isError,
    error,
  } = useGetProductQuery(productId!);

  if (isFetching) {
    return <>Loading prdocut details</>;
  }

  if (isError) {
    console.log("Fetch error:", error);

    return (
      <div>Error: Could not connect to the server. Please try again later.</div>
    );
  }
  const isDataStale = !currentData && product;

  return (
    <div className="product-details-container">
      <section className="product-details-title">
        <h1>Product Details</h1>
      </section>
      {isFetching && <Spin />}
      <Flex
        className="product-details-main"
        style={{ opacity: isDataStale || isFetching ? 0.5 : 1 }}
      >
        <div className="product-details-image">
          <Image width={512} src={product?.imageURI} />
        </div>

        <div className="product-details-panel">
          <div className="product-details-content">
            <Typography.Title className="product-details-name">
              {product?.name}
            </Typography.Title>
            <Typography.Paragraph className="product-details-description">
              {product?.description}
            </Typography.Paragraph>
            <Typography.Paragraph className="product-details-price">
              {product?.price}
            </Typography.Paragraph>
          </div>

          <div className="product-details-actions">
            <AddToCartBtn productId={product._id} />
            <EidtProductButton productId={product._id} />
          </div>
        </div>
      </Flex>
    </div>
  );
}
