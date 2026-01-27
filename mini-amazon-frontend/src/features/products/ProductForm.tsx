import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Image,
  Popconfirm,
  Tooltip,
  Modal,
} from "antd";
const { TextArea } = Input;
import type { ProductCreated, Product } from "@/app/types";
import { allCategories } from "@/app/types";

const previewLogo =
  "data:image/png;base64,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";

type ProductFormData = ProductCreated;

interface Props {
  data?: Product;
  onSave: (values: ProductCreated) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export default function ProductForm({
  data,
  onSave,
  onCancel,
  onDelete,
}: Props) {
  const categories = allCategories.map((x) => {
    return { value: x, label: x };
  });
  const [form] = Form.useForm<ProductFormData>();
  const isCreate = !data;
  const init_values = isCreate ? {} : (data as ProductFormData);
  // Monitors the 'imageURI' field in real-time for the preview
  const imageURI = Form.useWatch("imageURI", form);

  const onFinish = (values: ProductFormData) => {
    Modal.confirm({
      title: isCreate
        ? "Are you sure to create a new product?"
        : "Are you sure to update the product information?",
      onOk: () => onSave(values),
    });
  };
  return (
    <>
      <Form<ProductFormData>
        form={form}
        initialValues={init_values}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the product name (<150 characters)",
            },
          ]}
        >
          <Input showCount maxLength={150} />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input some text to describe your product",
            },
          ]}
        >
          <TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select the product category",
            },
          ]}
        >
          <Select options={categories} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "The price is supposed to be a postive number",
            },
          ]}
        >
          <InputNumber prefix="$" min={0.01} />
        </Form.Item>

        <Form.Item
          label="In Stock Quantity"
          name="inStockQuant"
          rules={[
            {
              required: true,
              message: "The stock is supposed to be at least 1",
            },
          ]}
        >
          <InputNumber min={1} step={1} />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageURI"
          rules={[
            {
              required: true,
              type: "url",
              message: "please input a valid url",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item dependencies={["imageURI"]}>
          {() => (
            <Image
              width={200}
              height={"auto"}
              alt="Image Preview"
              fallback={previewLogo}
              src={imageURI}
            />
          )}
        </Form.Item>

        <Tooltip
          title={
            isCreate ? "Create a new product!" : "Upate the product information"
          }
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Tooltip>

        <Popconfirm
          title="Are you sure to cancel?"
          description={
            isCreate
              ? "You will not create a new product!"
              : "The product information will keep unchanged!"
          }
          onConfirm={onCancel}
        >
          <Tooltip
            title={
              isCreate
                ? "Exit to create a new product!"
                : "Exit to upate the product information"
            }
          >
            <Button> Cancel </Button>
          </Tooltip>
        </Popconfirm>

        {!isCreate && (
          <Popconfirm
            title="Are you sure to delete this product ?"
            description="This product will be removed from product list!"
            onConfirm={onDelete}
          >
            <Tooltip title="Delete this item from database!">
              <Button onClick={onDelete}> Delete </Button>
            </Tooltip>
          </Popconfirm>
        )}
      </Form>
    </>
  );
}
