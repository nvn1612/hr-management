import "./login-form.css";
import { AntdButton } from "src/components/antd-button";
import { Form, Input, Checkbox } from "antd";
import type { FormProps } from "antd";

type LoginFieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
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
      className='login-form'
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
        <Form.Item name='remember' noStyle>
          <Checkbox className='remember'>Remember me</Checkbox>
        </Form.Item>
        <a className='forgot-password' href=''>
          Forgot Password
        </a>
      </Form.Item>
      <Form.Item>
        <AntdButton className='login-button' type='primary' htmlType='submit'>
          Login
        </AntdButton>
      </Form.Item>
    </Form>
  );
};
