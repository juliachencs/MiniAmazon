import { Typography, Select, Pagination, Row, Col, Spin } from "antd";
import { SORT_TYPES, type SortType } from "@/app/types";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getScreenType } from "@/app/utils";
import { useCountProductsQuery } from "@/features/product/productAPI";
import ProductCards from "@/components/product/ProductCards";

export default function Products() {
  const { data: total, isLoading, error } = useCountProductsQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    <Spin fullscreen spinning={true} tip="Loading..."></Spin>;
  }

  if (!total) {
    console.log(error);
    return <>We are having trouble to connect to the server!</>;
  }

  // validate the url
  const { page, key, sortby, page_size, redirect } = parseURL(
    searchParams,
    total,
  );

  if (redirect) {
    return (
      <Navigate
        to={`/products?page=${page}&sortby=${sortby}&key=${key}`}
        replace
      />
    );
  }

  // everything is correct now
  const handlePageChange = (p: number) => {
    navigate(`/products?page=${p}&sortby=${sortby}&key=${key}`);
  };

  const handleSortbyChange = (value: SortType) => {
    navigate(`/products?page=${1}&sortby=${value}&key=${key}`);
  };

  const offset = page_size * (page - 1);
  const limit = page_size;

  return (
    <section className="products-container">
      <Row justify="space-between" align="middle" className="products-header">
        <Col>
          <Typography.Title> Products </Typography.Title>
        </Col>
        <Col>
          <Select<SortType>
            defaultValue="Last"
            value={sortby}
            onChange={handleSortbyChange}
            options={[
              { value: "Last", label: "Last added" },
              { value: "PriceAsc", label: "Price: low to high" },
              { value: "PriceDes", label: "Price: high to low" },
            ]}
          />
        </Col>
      </Row>

      <Row className="products-main">
        <ProductCards offset={offset} limit={limit} sortby={sortby} />
      </Row>

      <Row justify="center" className="products-footer">
        <Pagination
          defaultCurrent={1}
          current={page}
          pageSize={page_size}
          total={total}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </Row>
    </section>
  );
}

// helper
const CONFIGS = {
  "magic-v1-xs": { page_size: 6 },
  "magic-v1-sm": { page_size: 12 },
  "magic-v1-md": { page_size: 24 },
};
type ValidKeys = keyof typeof CONFIGS;

function isValidSortBy(sortby: string) {
  return SORT_TYPES.map((x) => x.toLowerCase()).includes(sortby.toLowerCase());
}
// page, sortby, key
// page, sortby, key
//
function parseURL(
  params: URLSearchParams,
  total: number,
): {
  page: number;
  page_size: number;
  key: ValidKeys;
  sortby: SortType;
  redirect: boolean;
} {
  const sreentype = getScreenType();

  // default setting
  const local_key = `magic-v1-${sreentype}` as ValidKeys;
  const ds = {
    page: 1,
    key: local_key,
    page_size: CONFIGS[local_key]["page_size"],
    sortby: "Last" as SortType,
    redirect: true,
  };

  let page = parseInt(params.get("page") || "1");
  let key = params.get("key") || ds.key;
  const sortby = params.get("sortby") || ds.sortby;

  // check the input url is valid
  // 1. check sortby
  if (!isValidSortBy(sortby)) {
    return ds;
  }
  // 2. check if key is valid
  key = key.toLowerCase();
  if (!(key in CONFIGS)) {
    return ds;
  }
  // 3. check page
  if (
    page < 1 ||
    (page - 1) * CONFIGS[key as ValidKeys]["page_size"] >= total
  ) {
    return ds;
  }

  let redirect = false;
  // update page and key if key is not match current device
  if (key !== ds.key) {
    page = ((p, sz1, sz2) => Math.floor(((p - 1) * sz1) / sz2) + 1)(
      page,
      CONFIGS[key as ValidKeys]["page_size"],
      ds.page_size,
    );
    key = ds.key;
    redirect = true;
  }

  return {
    page,
    sortby: sortby as SortType,
    redirect,
    key: ds.key,
    page_size: ds.page_size,
  };
}
