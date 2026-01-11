import { Link } from "react-router";
import { Form, Button, Input, Modal } from "antd";

import { useState } from "react";
import "./UserCard.css";

interface UseFormFeild {
  email: string;
  password?: string;
}

function UserForm({
  buttonText,
  onSubmit,
  hasPasswordField = true,
}: {
  buttonText: string;
  hasPasswordField?: boolean;
  onSubmit?: (values: UseFormFeild) => void;
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
    <Form
      layout="vertical"
      name="userform"
      onFinish={onSubmit}
      scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
    >
      <Form.Item
        label={hasPasswordField ? "Email" : null}
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

      {hasPasswordField && (
        <Form.Item
          label="Password"
          name="password"
          tooltip={password_tooltip}
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
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}

function UserFormHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="user-form-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function UserFormFooter({ children }: { children: React.ReactNode }) {
  return <div className="user-form-footer flexrow">{children}</div>;
}

export function SignInUserCard() {
  const onSignIn = (values: UseFormFeild) => {
    console.log(values);
    Modal.info({
      content: (
        <p>
          {" "}
          email: {values.email} password: {values.password},{" "}
        </p>
      ),
    });
  };

  return (
    <div className="user-card sign-in-card">
      <UserFormHeader title="Sign in to your account" />
      <UserForm buttonText="Sign In" onSubmit={onSignIn} />
      <UserFormFooter>
        <div>
          <span>Don’t have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
        <div>
          {" "}
          <Link to="/recover">Forgot password?</Link>{" "}
        </div>
      </UserFormFooter>
    </div>
  );
}

export function SignUpUserCard() {
  const onSignUp = (values: UseFormFeild) => {
    Modal.info({
      content: (
        <p>
          {" "}
          email: {values.email} password: {values.password},{" "}
        </p>
      ),
    });
    console.log(values);
  };

  return (
    <div className="user-card sign-up-card">
      <UserFormHeader title="Sign up an account" />
      <UserForm buttonText="Create account" onSubmit={onSignUp} />
      <UserFormFooter>
        <div>
          <span>Already have an account?</span>
          <Link to="/signin">Sign in</Link>
        </div>
      </UserFormFooter>
    </div>
  );
}

export function RecoverPasswordUserCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onRecoverPassowrd = (values: UseFormFeild) => {
    setUserEmail(values.email);
    showModal();
  };

  return (
    <div className="user-card recover-password-card">
      <UserFormHeader
        title="Recover your password"
        subtitle="Enter your email to recover your password"
      />
      <UserForm
        buttonText="Update Password"
        hasPasswordField={false}
        onSubmit={onRecoverPassowrd}
      />
      <UserFormFooter>
        <div>
          {" "}
          <span>Remember your password?</span>{" "}
          <Link to="/sign-in">Sign in</Link>{" "}
        </div>
      </UserFormFooter>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<Link to="/login">Sign in</Link>}
        cancelText="Return"
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <p>
          A password reset email has been sent to {userEmail}. Please check your
          inbox.
        </p>
      </Modal>
    </div>
  );
}

export default function UserCard(form: "login" | "signup" | "recover") {
  if (form === "login") {
    return <SignInUserCard />;
  } else if (form === "signup") {
    return <SignUpUserCard />;
  } else {
    return <RecoverPasswordUserCard />;
  }
}
