import type { QueryError } from "@/errors/QueryError";
import { Modal, Result, Space, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { ButtonType } from "antd/es/button";

export function handleQueryError(error: QueryError) {
  const instance = Modal.error({
    title: "Oops, something went wrong",
    footer: null,
    icon: null,
  });

  const refreshPage = () => {
    window.location.reload();
  };

  const closeModal = () => {
    instance.destroy();
  };

  const extra = (
    <Space>
      {error.actions.map((action, i) => {
        const type = i === 0 ? "primary" : ("default" as ButtonType);
        switch (action) {
          case "REFRESH":
            return (
              <Button
                type={type}
                icon={<ReloadOutlined />}
                onClick={refreshPage}
              >
                Refresh
              </Button>
            );
          case "LOGIN":
            return <Button href="/login">Login</Button>;
          case "HOME":
            return <Button href="/">Home</Button>;
          case "CANCEL":
            return (
              <Button type={type} onClick={() => closeModal()}>
                Cancel
              </Button>
            );
          default:
            return (
              <Button type={type} onClick={() => closeModal()}>
                Back
              </Button>
            );
        }
      })}
    </Space>
  );

  const content = (
    <Result
      status="error"
      title={error.issue}
      subTitle={error.cause}
      extra={extra}
    >
      <p>{error.message} </p>
      <p>
        Feel free to contact us via email service@miniamazon.com for more
        support!
      </p>
    </Result>
  );
  instance.update({ content: content });
}
