import { useParams } from "react-router-dom";
import { Typography, Image, Spin, Row, Col, Space } from "antd";
import { useGetProductQuery } from "@/features/product/productAPI";
import AddToCartButton from "@/components/AddToCartButton";

import EditProductButton from "@/components/product/EditProductButton";
import { isAdmin, isGuest } from "@/app/utils";
import { useRole } from "@/features/auth/authHooks";

export default function Product() {
  const { role } = useRole();
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
    <section className="product-container">
      {isFetching && <Spin fullscreen />}

      <Row>
        <Typography.Title> Product Details </Typography.Title>
      </Row>

      <Row
        className="product-main"
        style={{ opacity: isDataStale || isFetching ? 0.5 : 1 }}
      >
        <Col xs={{ flex: "100%" }} sm={{ flex: "none" }}>
          <Image style={{ maxWidth: "512px" }} src={product?.imageURI} />
        </Col>

        <Col xs={{ flex: "100%" }} sm={{ flex: "auto" }}>
          <div style={{ maxWidth: "50vw" }} className="product-details-content">
            <Typography.Title level={3}>{product?.name}</Typography.Title>
            <Typography.Paragraph>{product?.description}</Typography.Paragraph>
            <Typography.Paragraph>{product?.price}</Typography.Paragraph>
            <Space>
              {!isGuest(role) && <AddToCartButton productId={product.id} />}
              {isAdmin(role) && <EditProductButton productId={product._id} />}
            </Space>
          </div>
        </Col>
      </Row>
    </section>
  );
}
