import { Modal, message, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/app/api";
import { type UserInfo } from "@/app/types";
import UserForm from "@/features/auth/UserForm";
import { getErrorProps } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";
import LinkButton from "@/components/LinkButton";
import LinkText from "@/components/LinkText";

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
        const status = error?.status;
        console.log(error);
        if (status && (status === 400 || status === 404)) {
          message.error(
            "Incorrect username or password! Please check your input",
          );
          return;
        }
        const { issue, suggestion } = getErrorProps(error);
        Modal.error({
          content: (
            <ErrorMessage
              trouble="Fail to sign in"
              issue={issue}
              suggestion={suggestion}
            >
              <LinkButton type="primary" to="/login">
                Sign in again
              </LinkButton>
              <LinkButton to="/"> Go Homepage</LinkButton>
              <LinkButton to="/products">Browser Products</LinkButton>
            </ErrorMessage>
          ),
          footer: null,
        });
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
