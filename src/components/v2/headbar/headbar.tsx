import "./headbar.css";
import { Typography, Popover, Button } from "antd";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { Eye, Pen } from "src/assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { useDispatch } from "react-redux";
import { hrManagementApi } from "src/share/services/";

export const Headbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (): void => {
    sessionStorageUtil.delete("accessToken");
    localStorageUtil.delete("refreshToken");
    dispatch(hrManagementApi.util.resetApiState());
    navigate("/login");
  };

  const UserHeadbarOption = () => {
    return (
      <div className='user-headbar-options'>
        <Button type='text' className='user-headbar-option-btn'>
          <Link to='/profile'>
            <Typography.Text>Profile</Typography.Text>
            <Pen />
          </Link>
        </Button>
        <Button
          className='user-headbar-option-btn'
          onClick={() => logout()}
          type='text'
        >
          <Typography.Text>Logout</Typography.Text>
          <Eye />
        </Button>
      </div>
    );
  };

  return (
    <header className='headbar'>
      <Typography.Title level={5}>Project Management</Typography.Title>
      <Popover content={<UserHeadbarOption />}>
        <CustomAvatar size={32} userName='N' />
      </Popover>
    </header>
  );
};
