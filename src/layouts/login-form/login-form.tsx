import "./login-form.css";
<<<<<<< HEAD
import { Form, Input, Checkbox, message } from "antd";
import { AntdButton } from "src/components/antd-button";
import { useLoginMutation } from "src/share/services/accountServices";
import { useNavigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";
=======
import { Form, Input, Button, message, Spin } from "antd";
import { useLoginMutation } from "src/share/services/accountServices";
import { useNavigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";
import { Link } from "react-router-dom";
>>>>>>> main

import type { FormProps } from "antd";

export type LoginFieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};
export type LoginReqBody = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
<<<<<<< HEAD
  const [loginService] = useLoginMutation();
=======
  const [loginService, loginStatus] = useLoginMutation();
>>>>>>> main

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    await loginService({
      email: values.username,
      password: values.password,
    } as LoginReqBody)
      .unwrap()
      .then((resp) => {
        localStorageUtil.set("accessToken", resp.data.tokens.accessToken);
        localStorageUtil.set("refreshToken", resp.data.tokens.refreshToken);
        localStorageUtil.set("role", resp.data.role);
        localStorageUtil.set("accessDate", Date.now() + 86400000);
        navigate("/dashboard");
      })
<<<<<<< HEAD
      .catch((e) => {
        messageApi.error(e);
=======
      .catch(() => {
        messageApi.error("Failed to Login");
>>>>>>> main
      });
  };

  return (
    <>
      {contextHolder}
<<<<<<< HEAD
      <Form
        name='login'
        onFinish={onFinish}
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
          <AntdButton className='login-button' type='primary' htmlType='submit'>
            Login
          </AntdButton>
        </Form.Item>
      </Form>
=======
      <Spin spinning={loginStatus.isLoading} size='large' tip=''>
        <Form
          name='login'
          onFinish={onFinish}
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
            <Link to={"/forgot-password"}>Forgot Password ?</Link>
          </Form.Item>
          <Form.Item>
            <Button className='login-button' type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
>>>>>>> main
    </>
  );
};
