import type { ProductCreated } from "@/app/types";
import DelayedRedirect from "@/components/DelayedRedirect";
import ErrorMessage from "@/components/product/ErrorMessage";
import ProductForm from "@/components/product/ProductForm";
import { handleQueryError } from "@/errors/handlers";
import ProductEditQueryError from "@/errors/ProductEditQueryError";
import {
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/features/product/productAPI";

import { Skeleton, Spin, Typography, Flex, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isSuccess, isError, error } = useGetProductQuery(
    productId as string,
  );
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  if (!productId) {
    return <DelayedRedirect title="Invalid URL" redirect={"/products"} />;
  }

  if (isError) {
    console.log(error);
    const status = "status" in error ? error.status : "UNKOWN_ISSUE";
    return <ErrorMessage task="GET_PRODUCT" status={status} />;
  }

  if (!isSuccess) {
    return (
      <Spin tip="Loading" fullscreen>
        <Skeleton active={true} />
      </Spin>
    );
  }

  const onSave = (values: ProductCreated) => {
    const product = { ...data, ...values };
    setIsSubmitting(true);
    updateProduct(product)
      .unwrap()
      .then(() => {
        message.success("Product is updated!");
        navigate(`/products/item/${product._id}`);
      })
      .catch((error) => {
        console.log(error);
        // handleUpdateError(error, "The product information can not be updated!");
        console.log(error);
        const query_error = new ProductEditQueryError(
          "UPDATE_PRODUCT",
          error.status || "UNKOWN_ISSUE",
        );
        handleQueryError(query_error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onCancel = () => {
    message.info({ content: "No product information is upated!" });
    navigate(`/products/item/${data._id}`);
  };

  const onDelete = () => {
    setIsSubmitting(true);
    deleteProduct(productId)
      .unwrap()
      .then(() => {
        message.success("Success delete the product!");
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);

        const query_error = new ProductEditQueryError(
          "DELETE_PRODUCT",
          error.status || "UNKOWN_ISSUE",
        );
        handleQueryError(query_error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Spin spinning={isSubmitting} fullscreen />
      <Flex vertical style={{ opacity: isSubmitting ? 0.5 : 1 }}>
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
