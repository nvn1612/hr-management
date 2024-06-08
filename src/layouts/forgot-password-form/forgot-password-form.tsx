import "./forgot-password-form.css";
import { Form, Input, Button, message, Spin } from "antd";
import { useClaimPasswordMutation } from "src/share/services/accountServices";
import { Link } from "react-router-dom";

import type { FormProps } from "antd";

export type LoginFieldType = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [claimPassword, claimingStatus] = useClaimPasswordMutation();

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    await claimPassword({
      email: values.email,
    })
      .unwrap()
      .then(() => {
        messageApi.success("Please check your email");
      })
      .catch(() => {
        messageApi.error("There was an error");
      });
  };

  return (
    <>
      {contextHolder}
      <Spin
        spinning={claimingStatus.isLoading}
        size='large'
        tip='Sending Request'
      >
        <Form
          name='forgor-password'
          onFinish={onFinish}
          className='login-form'
          autoComplete='off'
        >
          <Form.Item<LoginFieldType>
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item>
            <Link to={"/login"}>Back to login</Link>
          </Form.Item>
          <Form.Item>
            <Button className='submit-button' type='primary' htmlType='submit'>
              Claim password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
