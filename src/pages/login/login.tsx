import "./login.css";
import { LoginForm } from "src/layouts/login-form";

export const Login = () => {
  return (
    <div className='login-page'>
      <img src='src/assets/demo-logo/random.png' alt='Company Logo' />
      <div className='login-form-container'>
        <LoginForm />
      </div>
      <div className='footer-info'>&copy; 2024 Random Incorporated.</div>
    </div>
  );
};
