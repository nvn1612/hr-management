import "./user-info.css";
import { Avatar, Spin } from "antd";
import { UserInfoForm } from "src/layouts/";
import { useGetUserDetailQuery } from "src/share/services";
import { localStorageUtil, randAvaBg } from "src/share/utils";

export const UserInfo = () => {
  const { data, isLoading } = useGetUserDetailQuery();
  const role = localStorageUtil.get("role");
  return (
    <Spin size='large' tip='Loading User Detail' spinning={isLoading}>
      <div className='user-info-container'>
        <div className='first-section'>
          <Avatar size={128} style={{ background: randAvaBg(), fontSize: 64 }}>
            {data?.username?.substring(0, 1).toLocaleUpperCase()}
          </Avatar>
          <h3>{data?.username}</h3>
          <h3>{role}</h3>
        </div>
        <UserInfoForm
          {...(data && {
            initValues: {
              username: data.username,
              name: data.name,
              email: data.email,
              phone: data.phone,
              birthday: data.birthday,
            },
          })}
          action='detail'
        />
      </div>
    </Spin>
  );
};
