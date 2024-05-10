import "./user-info.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserInfoForm } from "src/layouts/";
export const UserInfo = () => {
  return (
    <div className='user-info-container'>
      <div className='first-section'>
        <Avatar size={128} icon={<UserOutlined />} />
        <h3>Account's username</h3>
        <h3>Staff</h3>
      </div>
      <UserInfoForm
        initValues={{
          username: "Devil666",
          name: "Nguyen Van A",
          email: "nonamemail123@gmail.com",
          phone: "0123456789",
          status: true,
          birthDay: "1999/01/01",
        }}
      />
    </div>
  );
};
