import { UserOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";

import { useRole } from "@/app/hooks";
import { useSignoutMutation } from "@/app/api";
import { getErrorProps } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";

export default function AuthAvatar() {
  const [signout] = useSignoutMutation();
  const { role } = useRole();

  const onSignout = () => {
    signout({})
      .unwrap()
      .then(() => {
        message.success("You have signed out", 5);
      })
      .catch((error: Error) => {
        const { issue, suggestion } = getErrorProps(error);
        Modal.error({
          content: (
            <ErrorMessage
              trouble="Fail to sign out"
              issue={issue}
              suggestion={suggestion}
            >
              <Button href="/"> Go Homepage</Button>
              <Button href="/products">Browser Products</Button>
            </ErrorMessage>
          ),
          footer: null,
        });
      });
  };

  switch (role) {
    case "ADMIN":
      return (
        <Button
          icon={<UserOutlined style={{ color: "var(-primary-hl-bg-color)" }} />}
          type="text"
          onClick={onSignout}
        >
          Sign out
        </Button>
      );

    case "REGULAR":
      return (
        <Button icon={<UserOutlined />} type="text" onClick={onSignout}>
          Sign out
        </Button>
      );

    default:
      return (
        <Button icon={<UserOutlined />} type="text" href="/login">
          Sign in
        </Button>
      );
  }
}
