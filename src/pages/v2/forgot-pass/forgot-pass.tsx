import "./forgot-pass.css";
import { Link } from "react-router-dom";
import {
  ConfirmEmailForm,
  ConfirmOtpForm,
} from "src/layouts/v2/forgot-pass-form";
import { Typography } from "antd";
import { useState } from "react";

export const ForgotPass = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  const formMap = () => {
    switch (currStep) {
      case 0:
        return (
          <ConfirmEmailForm
            saveEmail={(userEmail: string) => {
              setEmail(userEmail);
              setCurrStep(1);
            }}
          />
        );
      case 1:
        return <ConfirmOtpForm email={email} nextStep={() => setCurrStep(2)} />;
    }
  };
  return (
    <>
      <div className='forgot-pass-page'>
        <div className='forgot-form-container'>
          <Typography.Title level={3}>Reset Password</Typography.Title>
          {formMap()}
          <Typography.Text>
            Remember Password ? <Link to={"/v2/login"}>Login Now</Link>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
