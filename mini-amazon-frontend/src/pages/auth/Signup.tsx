import { Button, Flex, message, Modal, Typography } from "antd";
import UserForm from "@/pages/auth/UserForm";
import { useSignupMutation } from "@/app/api";
import { useNavigate } from "react-router-dom";
import type { UserInfo } from "@/app/types";
import { getErrorProps } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";
import LinkButton from "@/components/LinkButton";
import LinkText from "@/components/LinkText";
import { handleQueryError } from "@/errors/handlers";
import { AuthQueryError } from "@/errors/AuthQueryError";

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
        const query_error = new AuthQueryError(
          "SIGNUP",
          error.status || "UNKOWN_ISSUE",
        );
        handleQueryError(query_error);
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
