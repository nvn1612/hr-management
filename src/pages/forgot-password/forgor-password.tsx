import "./forgot-password.css";
import { Navigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";
import { ForgotPasswordForm } from "src/layouts";

export const ForgotPassword = () => {
  const accessToken = () => localStorageUtil.get("accessToken");
  const accessDate = () => localStorageUtil.get("accessDate");
  return (
    <>
      {accessToken() &&
      accessDate() &&
      Date.now() - parseInt(accessDate() as string) < 0 ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <div className='forgot-password-page'>
          <img src='src/assets/demo-logo/random.png' alt='Company Logo' />
          <div className='forgot-password-form-container'>
            <ForgotPasswordForm />
          </div>
        </div>
      )}
    </>
  );
};
