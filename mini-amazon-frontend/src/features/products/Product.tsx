import { useGetProductQuery } from "../../app/api"; // adjust the import path as needed
import { useParams } from "react-router-dom";

import { Flex, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;
export default function Product() {
  const { productId } = useParams();
  console.log(productId);

  const { data, isFetching, isError, error } = useGetProductQuery(productId!);
  if (isFetching) {
    return <>Loading prdocut details</>;
  }

  if (isError) {
    console.log("Fetch error:", error);

    return (
      <div>Error: Could not connect to the server. Please try again later.</div>
    );
  }

  console.log(data);
  const { data: product } = data;
  console.log(product.image_url);

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#0958d9",
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#1677ff",

    overflow: "scroll",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  };
  return (
    <>
      <Layout>
        <Sider style={siderStyle}>
          <img width="256px" src={product.image_url}></img>
        </Sider>
        <Layout style={{ width: "max-content" }}>
          <Header style={headerStyle}>{product.name}</Header>
          <Content style={contentStyle}>{product.description}</Content>
          <Footer style={footerStyle}>Nothing</Footer>
        </Layout>
      </Layout>
    </>
  );
}
