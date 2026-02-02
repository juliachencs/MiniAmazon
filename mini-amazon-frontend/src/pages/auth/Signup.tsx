import type { UserInfo } from "@/app/types";
import UserForm from "@/components/auth/UserForm";
import NavButton from "@/components/NavButtons";
import { AuthQueryError } from "@/errors/AuthQueryError";
import { handleQueryError } from "@/errors/handlers";
import { useSignupMutation } from "@/features/auth/authAPI";
import { Flex, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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
        console.log(error);
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
          <NavButton type="link" to="/login">
            Sign in
          </NavButton>
        </div>
      </Flex>
    </div>
  );
}
