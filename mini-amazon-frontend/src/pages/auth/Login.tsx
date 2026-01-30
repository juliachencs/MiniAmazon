import type { UserInfo } from "@/app/types";
import UserForm from "@/components/auth/UserForm";
import NavButton from "@/components/NavButtons";
import { useLoginMutation } from "@/features/auth/authAPI";
import { Flex, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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
        console.log(error);
        // const query_error = new AuthQueryError(
        //   "LOGIN",
        //   error.status || "UNKOWN_ISSUE",
        // );
        // handleQueryError(query_error);
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
          <NavButton type="link" to="/signup">
            Sign up
          </NavButton>
        </div>

        <div>
          <NavButton type="link" to="/recover">
            Forgot password?
          </NavButton>
        </div>
      </Flex>
    </div>
  );
}
