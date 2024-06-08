import "./forgot-password-form.css";
import { Form, Input, Button, message, Spin } from "antd";
import { useClaimPasswordMutation } from "src/share/services/accountServices";
import { Link } from "react-router-dom";

import type { FormProps } from "antd";

<<<<<<< HEAD
export type LoginFieldType = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [claimPassword, claimingStatus] = useClaimPasswordMutation();

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
=======
export type ComfirmEmailFormType = {
  email: string;
};

export const ForgotPasswordForm = ({
  saveEmail,
}: {
  saveEmail: (saveEmail: string) => void;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [claimPassword, claimingStatus] = useClaimPasswordMutation();

  const onFinish: FormProps<ComfirmEmailFormType>["onFinish"] = async (
    values
  ) => {
>>>>>>> main
    await claimPassword({
      email: values.email,
    })
      .unwrap()
      .then(() => {
        messageApi.success("Please check your email");
<<<<<<< HEAD
=======
        saveEmail(values.email);
>>>>>>> main
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
<<<<<<< HEAD
          className='login-form'
          autoComplete='off'
        >
          <Form.Item<LoginFieldType>
=======
          className='forgot-password-form'
          autoComplete='off'
        >
          <Form.Item<ComfirmEmailFormType>
>>>>>>> main
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item>
<<<<<<< HEAD
            <Link to={"/login"}>Back to login</Link>
          </Form.Item>
          <Form.Item>
            <Button className='submit-button' type='primary' htmlType='submit'>
              Claim password
            </Button>
=======
            <Button className='submit-button' type='primary' htmlType='submit'>
              Send OTP to email
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to={"/login"}>Back to login</Link>
>>>>>>> main
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
