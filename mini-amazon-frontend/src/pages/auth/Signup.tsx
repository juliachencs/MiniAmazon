import { Button, Flex, message, Modal, Typography } from "antd";
import UserForm from "@/pages/auth/UserForm";
import { useSignupMutation } from "@/app/api";
import { useNavigate } from "react-router-dom";
import type { UserInfo } from "@/app/types";
import { getErrorProps } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";
import LinkButton from "@/components/LinkButton";
import LinkText from "@/components/LinkText";

export default function Signup() {
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const onSignup = (values: UserInfo) => {
    signup(values)
      .unwrap()
      .then(() => {
        message.success(
          "You have successfully created an account and logged in",
          2,
        );
        navigate("/products");
      })
      .catch((error) => {
        const status = error?.status;
        console.log(error);
        if (status && status === 409) {
          message.error(
            "This email address is not available. Choose a different address.",
          );
          return;
        }
        const { issue, suggestion } = getErrorProps(error);
        Modal.error({
          content: (
            <ErrorMessage
              trouble="Fail to sign up"
              issue={issue}
              suggestion={suggestion}
            >
              <LinkButton type="primary" to="/login">
                Sign up again
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
    <div className="auth-card" style={{ opacity: isLoading ? 0.5 : 1 }}>
      <Flex justify="center" align="center" vertical>
        <Typography.Title level={3}> Create an account</Typography.Title>

        <UserForm type="signup" handler={onSignup} />

        <div>
          <Typography.Text>Already have an account?</Typography.Text>
          <LinkText to="/login">Sign in</LinkText>
        </div>
      </Flex>
    </div>
  );
}
