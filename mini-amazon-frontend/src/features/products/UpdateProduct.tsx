import {
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/api";
import { getErrorProps, MakeProductLink } from "@/app/utils";
import ErrorMessageCard from "@/components/ErrorMessage";
import LinkButton from "@/components/LinkButton";
import ProductForm from "@/features/products/ProductForm";
import { Skeleton, Spin, Typography, Flex, message, Modal, Result } from "antd";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [isBusy, setIsBusy] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const { data, isLoading, isFetching, isError, error, currentData } =
    useGetProductQuery(productId as string);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const link = MakeProductLink(productId);
  console.log(link);
  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <Skeleton active={true} />
      </Spin>
    );
  }

  if (isError) {
    const { issue, suggestion } = getErrorProps(error);
    return (
      <ErrorMessageCard
        issue={issue}
        suggestion={suggestion}
        trouble="Fail to get information for editting the product!"
      ></ErrorMessageCard>
    );
  }

  const handleUpdateError = (error, trouble) => {
    const { issue, suggestion } = getErrorProps(error);
    const result = (
      <ErrorMessageCard
        issue={issue}
        suggestion={suggestion}
        trouble={trouble}
      ></ErrorMessageCard>
    );
    Modal.error({
      content: result,
    });
  };

  const onSave = (values) => {
    const product = { ...data, ...values };
    setIsBusy(true);
    updateProduct(product)
      .unwrap()
      .then(() => {
        message.success("Product is updated!");
        navigate(link);
      })
      .catch((error) => {
        handleUpdateError(error, "The product information can not be updated!");
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const onCancel = () => {
    message.info({ content: "No product information is upated!" });
  };

  const onDelete = () => {
    setIsBusy(true);
    deleteProduct(productId)
      .unwrap()
      .then(() => {
        message.success("Success delete the product!");
        navigate("/products");
      })
      .catch((error) => {
        handleUpdateError(error, "We cann't delete the product right now!");
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const isDataStale = !currentData && data;
  return (
    <>
      <Spin spinning={isBusy} fullscreen />
      <Flex vertical style={{ opacity: isDataStale || isBusy ? 0.5 : 1 }}>
        {isFetching && <Spin />}
        <section>
          <Typography.Title>Edit Product</Typography.Title>
        </section>
        <section>
          <ProductForm
            data={data}
            onDelete={onDelete}
            onSave={onSave}
            onCancel={onCancel}
          ></ProductForm>
        </section>
      </Flex>
    </>
  );
}
