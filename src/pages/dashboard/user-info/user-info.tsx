import "./user-info.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserInfoForm } from "src/layouts/";
import { useGetUserDetailQuery } from "src/share/services";

export const UserInfo = () => {
  const { data } = useGetUserDetailQuery();

  return (
    <div className='user-info-container'>
      <div className='first-section'>
        <Avatar size={128} icon={<UserOutlined />} />
        <h3>Account's username</h3>
        <h3>Staff</h3>
      </div>
      <UserInfoForm
        {...(data && {
          initValues: {
            username: data.data.username,
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            birthday: data.data.birthday,
          },
        })}
        action='detail'
      />
    </div>
  );
};
