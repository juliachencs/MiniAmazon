import LinkButton from "@/components/NavButtons";
import { AuthQueryError } from "@/errors/AuthQueryError";
import { handleQueryError } from "@/errors/handlers";
import { useSignoutMutation } from "@/features/auth/authAPI";
import { useRole } from "@/features/auth/authHooks";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

export default function AuthAvatar() {
  const [signout, { isLoading }] = useSignoutMutation();
  const { role } = useRole();

  const onSignout = () => {
    console.log("I am gonna sign out");
    signout()
      .unwrap()
      .then(() => {
        message.success("You have signed out", 5);
      })
      .catch((error) => {
        console.log(error);
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
          icon={<UserOutlined />}
          type="text"
          onClick={onSignout}
          loading={isLoading}
          style={{ color: "var(--primary-hl-bg-color)" }}
        >
          Sign out
        </Button>
      );

    case "Regular":
      return (
        <Button
          icon={<UserOutlined />}
          type="text"
          onClick={onSignout}
          loading={isLoading}
        >
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
