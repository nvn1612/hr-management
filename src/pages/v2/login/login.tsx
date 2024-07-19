import "./login.css";
import { LoginForm } from "src/layouts/v2";
import { Typography } from "antd";
import { DocumentSection } from "src/components/v2";

export const Login = () => {
  return (
    <div className='v2-login-page'>
      <div className='login-form-container'>
        <DocumentSection />
        <Typography.Title level={2}>LOGIN</Typography.Title>
        <LoginForm />
      </div>
    </div>
  );
};
