import { UserOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";

import { useRole } from "@/app/hooks";
import { useSignoutMutation } from "@/app/api";
import { getErrorProps } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";
import LinkButton from "@/components/LinkButton";
import { AuthQueryError } from "@/errors/AuthQueryError";
import { handleQueryError } from "@/errors/handlers";

export default function AuthAvatar() {
  const [signout, { isLoading }] = useSignoutMutation();
  const { role } = useRole();

  const onSignout = () => {
    console.log("I am gonna sign out");
    signout({})
      .unwrap()
      .then(() => {
        message.success("You have signed out", 5);
      })
      .catch((error) => {
        const query_error = new AuthQueryError(
          "SIGNOUT",
          error.status || "UNKOWN_ISSUE",
        );
        handleQueryError(query_error);
      });
  };

  switch (role) {
    case "Admin":
      return (
        <Button
          icon={<UserOutlined style={{ color: "var(-primary-hl-bg-color)" }} />}
          type="text"
          onClick={onSignout}
          loading={isLoading}
        >
          Sign out
        </Button>
      );

    case "Regular":
      return (
        <Button icon={<UserOutlined />} type="text" onClick={() => onSignout()}>
          Sign out
        </Button>
      );

    default:
      return (
        <LinkButton icon={<UserOutlined />} type="text" to="/login">
          Sign in
        </LinkButton>
      );
  }
}
