import { Form, Input, Button } from "antd";
import { type UserInfo } from "../types";

export default function UserForm({
  buttonText,
  handler,
  hidden = false,
}: {
  buttonText: string;
  handler: (x: UserInfo) => void;
  hidden?: boolean;
}) {
  const password_tooltip = (
    <div>
      A valid password consists of at least onenumber, letter and special
      character. It must contain
      <ul>
        <li> at least one number, </li>
        <li> at least one uppercase letter,</li>{" "}
        <li> at least one lowercase letter</li>{" "}
        <li> at least one special character(@.#$!%*?&_+-)</li>{" "}
        <li> at least 8 characters</li>
        <li> at most 24 characters.</li>
      </ul>
    </div>
  );
  return (
    <Form<UserInfo>
      layout="vertical"
      name="userform"
      onFinish={handler}
      initialValues={{ email: "regular@user.com", password: "ABC@abc@123" }}
      style={{ width: "100%" }}
      scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
    >
      <Form.Item
        label={hidden ? "" : "Email"}
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            pattern: new RegExp(
              /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
            ),
            message: "Invalid email",
          },
        ]}
      >
        <Input placeholder="example@example.com" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        tooltip={password_tooltip}
        hidden={hidden}
        rules={[
          { required: true, message: "Please input your password!" },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&_\+\-])[A-Za-z\d@.#$!%*?&_\+\-]{8,32}$/,
            message: "Invalid password",
          },
        ]}
      >
        <Input.Password placeholder="abcd&Abcd@123" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={{ width: "100%" }} htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}
