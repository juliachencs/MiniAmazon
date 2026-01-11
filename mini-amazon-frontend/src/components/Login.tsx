import { Modal, message, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../store/api";
import { type UserInfo } from "../types";
import UserForm from "../components/UserForm";

export default function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onLogin = (values: UserInfo) => {
    login(values)
      .then((response) => {
        if (response.data) {
          message.success("Success Login", 2);
          navigate("/");
        }
        if (response.error) {
          console.log(response.error);
          message.error(
            "The email or password you entered is incorrect. Please try again."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: "Unknow Login Error",
          content: JSON.stringify(err),
        });
      });
  };

  return (
    <Flex justify="center" align="center" vertical>
      <Typography.Title level={3}> Sign in to your account</Typography.Title>

      <UserForm handler={onLogin} buttonText="Sign in" />

      <div>
        <Typography.Text>Don’t have an account?</Typography.Text>
        <Typography.Link href="/signup">Sign up</Typography.Link>
      </div>
      <div>
        <Typography.Link href="/recover">Forgot password?</Typography.Link>
      </div>
    </Flex>
  );
}
