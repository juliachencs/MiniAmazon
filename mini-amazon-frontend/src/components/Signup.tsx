import { Modal, message, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { useSignupMutation } from "../store/api";
import { type UserInfo } from "../types";
import UserForm from "../components/UserForm";

export default function Signup() {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const onSignup = (values: UserInfo) => {
    signup(values)
      .then((response) => {
        if (response.data) {
          message.success("Success signup", 2);
          navigate("/");
        }
        if (response.error) {
          console.log(response.error);
          message.error("Signup fail!Try again!");
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: "Unknow Signup Error",
          content: JSON.stringify(err),
        });
      });
  };

  return (
    <Flex justify="center" align="center" vertical>
      <Typography.Title level={3}> Create an account</Typography.Title>

      <UserForm handler={onSignup} buttonText="Sign up" />

      <div>
        <Typography.Text>Already have an account?</Typography.Text>
        <Typography.Link href="/login">Sign in</Typography.Link>
      </div>
    </Flex>
  );
}
