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
          fullname: "Nguyen Van A",
          address: "a to b to c in 1 in 2 in 3",
          email: "nonamemail123@gmail.com",
        }}
      />
    </div>
  );
};
