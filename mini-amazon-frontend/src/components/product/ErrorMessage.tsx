import { BackButton, HomeButton, LoginButton } from "@/components/NavButtons";
import type {
  ProductQueryTask,
  QueryErrorAction,
  QueryErrorCode,
  QueryErrorDetails,
} from "@/errors/types";
import { getErrorDetail } from "@/errors/utils";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Result, Space } from "antd";

interface ErrorMessageCardProps {
  issue: string; // describe the issue we are facing
  cause: string; // explain what the cause of the issue
  message: string; // give some suggestions on the issue
  actions: QueryErrorAction[];
}

function action2button(action: string, isprimary: boolean) {
  const refreshPage = () => {
    window.location.reload();
  };
  const type = isprimary ? "primary" : "default";
  switch (action) {
    case "REFRESH":
      return (
        <Button type={type} icon={<ReloadOutlined />} onClick={refreshPage}>
          Refresh
        </Button>
      );
    case "LOGIN":
      return <LoginButton />;
    case "Back":
      return <BackButton />;
    case "HOME":
      return <HomeButton />;
    default:
      return <></>;
  }
}

export function ErrorMessageCard({
  issue,
  cause,
  message,
  actions,
}: ErrorMessageCardProps) {
  const children = (
    <Space>{actions.map((a, i) => action2button(a, i == 0))}</Space>
  );
  return (
    <Result
      style={{ alignSelf: "center", margin: "auto" }}
      status="error"
      title={issue}
      subTitle={cause}
      extra={children}
    >
      <p>
        {message}
        Feel free to contact us via email service@miniamazon.com for more
        support!
      </p>
    </Result>
  );
}

interface ErrorMessageProps {
  task: ProductQueryTask;
  status: QueryErrorCode;
}
export default function ErrorMessage({ task, status }: ErrorMessageProps) {
  const issues: Record<ProductQueryTask, string> = {
    GET_PRODUCT: "Sorry, we are not able to get the product information",
    GET_PRODUCTS:
      "Sorry, we are not able to retrieve the information about products",
    GET_PRODUCT_COUNT:
      "Sorry, we are not able to get the total number of products",
  };

  const details: Record<QueryErrorCode, QueryErrorDetails> = {
    404: {
      cause: "The product doesn't exist.",
      message: "Please check the url is correct!",
      actions: ["REFRESH", "BACK"],
    },
  };

  const { cause, message, actions } = getErrorDetail(status, details);
  return (
    <ErrorMessageCard
      issue={issues[task]}
      cause={cause}
      message={message}
      actions={actions}
    />
  );
}
