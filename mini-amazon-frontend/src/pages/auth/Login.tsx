import { message, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/app/api";
import { type UserInfo } from "@/app/types";
import UserForm from "@/pages/auth/UserForm";

import LinkText from "@/components/LinkText";
import { AuthQueryError } from "@/errors/AuthQueryError";
import { handleQueryError } from "@/errors/handlers";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onLogin = (values: UserInfo) => {
    login(values)
      .unwrap()
      .then(() => {
        message.success("You have successfully logged in!", 3);
        navigate("/products");
      })
      .catch((error) => {
        const query_error = new AuthQueryError(
          "LOGIN",
          error.status || "UNKOWN_ISSUE",
        );
        handleQueryError(query_error);
      });
  };

  return (
    <div className="auth-card">
      <Flex
        justify="center"
        align="center"
        vertical
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        <Typography.Title level={3}> Sign in to your account</Typography.Title>

        <UserForm type="login" handler={onLogin} />

        <div>
          <Typography.Text>Don’t have an account?</Typography.Text>
          <LinkText to="/signup">Sign up</LinkText>
        </div>

        <div>
          <LinkText to="/recover">Forgot password?</LinkText>
        </div>
      </Flex>
    </div>
  );
}
