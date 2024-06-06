import "./login-form.css";
import { Form, Input, Checkbox, message } from "antd";
import { AntdButton } from "src/components/antd-button";
import { useLoginMutation } from "src/share/services/accountServices";
import { useNavigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";

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
  const [loginService] = useLoginMutation();

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
      .catch((e) => {
        messageApi.error(e);
      });
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};
