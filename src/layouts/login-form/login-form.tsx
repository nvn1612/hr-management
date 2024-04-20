import "./login-form.css";
import { AntdButton } from "src/components/antd-button";
import { Form, Input } from "antd";
import type { FormProps } from "antd";

type LoginFieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<LoginFieldType>["onFinish"] = (values) => {
  console.log("success" + values);
};

const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("error", errorInfo);
};

export const LoginForm = () => {
  return (
    <Form
      name='login'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<LoginFieldType>
        name='username'
        rules={[{ required: true, message: "Username is required" }]}
      >
        <Input placeholder='Username' />
      </Form.Item>
      <Form.Item<LoginFieldType>
        name='password'
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password placeholder='Password' />
      </Form.Item>
      <Form.Item>
        <AntdButton type='primary' htmlType='submit'>
          Login
        </AntdButton>
      </Form.Item>
    </Form>
  );
};
