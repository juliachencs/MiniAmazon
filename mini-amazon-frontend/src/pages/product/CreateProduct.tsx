import type { ProductCreated } from "@/app/types";
import ProductForm from "@/components/product/ProductForm";
import { handleQueryError } from "@/errors/handlers";
import ProductEditQueryError from "@/errors/ProductEditQueryError";
import { useCreateProductMutation } from "@/features/product/productAPI";
import { Flex, message, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProduct] = useCreateProductMutation();

  const onSave = (values: ProductCreated) => {
    setIsSubmitting(true);
    createProduct(values)
      .unwrap()
      .then((x) => {
        message.success("Product is created!");
        navigate(`/products/item/${x._id}`);
      })
      .catch((error) => {
        console.log(error);
        const query_error = new ProductEditQueryError(
          "CREATE_PRODUCT",
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
    navigate(`/products`);
  };

  return (
    <>
      <Flex vertical style={{ opacity: isSubmitting ? 0.5 : 1 }}>
        <section>
          <Typography.Title>Edit Product</Typography.Title>
        </section>
        <section>
          <ProductForm onSave={onSave} onCancel={onCancel}></ProductForm>
        </section>
      </Flex>
    </>
  );
}
