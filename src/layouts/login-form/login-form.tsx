import "./login-form.css";
import { AntdButton } from "src/components/antd-button";
import { Form, Input, Checkbox, message } from "antd";
import type { FormProps } from "antd";
import { useLoginMutation } from "src/share/services/accountServices";
import { useNavigate } from "react-router-dom";

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
      .then((resp) => {
        if (!resp.error) {
          navigate("/dashboard");
          messageApi.success("success");
        }
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
    </>
  );
};
