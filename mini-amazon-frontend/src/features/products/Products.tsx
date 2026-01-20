import { useState } from "react";
import {
  Button,
  Typography,
  Select,
  Pagination,
  Flex,
  Spin,
  Alert,
} from "antd";
import { useListProductsQuery } from "@/app/api";
import ListProducts from "./ListProducts";
import CreateProductBtn from "./CreateProductBtn";

export default function Products() {
  const page_size = 24;
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("Last");

  const { data, isFetching, isError, error } = useListProductsQuery({
    offset: (page - 1) * page_size,
    limit: page_size,
    sortby: sortby,
  });

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPage(page);
  };

  if (isFetching) {
    return (
      <Spin tip="Loading" size="large">
        <Alert
          title="Loading....."
          description="Fetching data from the sever."
          type="info"
        />
      </Spin>
    );
  }

  if (isError) {
    console.log("Fetch error:", error);

    if (error.status === "FETCH_ERROR") {
      return;
    }
  }

  if (!data?.data) {
    return <div>No products :(</div>;
  }
  const { data: products, total } = data;
  console.log(data);
  console.log(products);
  console.log(`total: ${total}`);

  return (
    <>
      {" "}
      <Typography.Title> Products </Typography.Title>
      <div>
        <Select
          name="sortby"
          defaultValue="Last"
          onChange={(value) => setSortby(value)}
          options={[
            { value: "Last", label: "Last added" },
            { value: "PriceAsc", label: "Price: low to high" },
            { value: "PriceDes", label: "Price: high to low" },
          ]}
        />
        <CreateProductBtn />
      </div>
      <ListProducts products={products} />
      <Pagination
        defaultCurrent={1}
        current={page}
        pageSize={page_size}
        total={total}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </>
  );
}
