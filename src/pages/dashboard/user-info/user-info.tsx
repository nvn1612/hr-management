import "./user-info.css";
import { Avatar, Button, Spin, Upload, message } from "antd";
import { UserInfoForm } from "src/layouts/";
import {
  useGetUserDetailQuery,
  useGetAvatarMutation,
} from "src/share/services";
import { localStorageUtil, randAvaBg } from "src/share/utils";
import { CameraOutlined } from "@ant-design/icons";

import type { UploadProps } from "antd";
import { useEffect, useState } from "react";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

const avaFileProps: UploadProps = {
  name: "Avatar",
  action: `${baseApi}users/upload-avatar-from-local`,
  headers: {
    authorization: localStorageUtil.get("accessToken")!,
  },

  onChange(info) {
    if (info.file.status === "done") {
      message.success(`Avatar upload successfully`);
    } else if (info.file.status === "error") {
      message.error(`Avatar upload failed.`);
    }
  },
};

export const UserInfo = () => {
  const [avatar, setAvatar] = useState<string>();

  const { data, isLoading } = useGetUserDetailQuery();
  const [getAvatar] = useGetAvatarMutation();
  const role = localStorageUtil.get("role");

  useEffect(() => {
    if (!avatar) {
      getAvatar({ avatar: data?.avatar })
        .unwrap()
        .then((link) => setAvatar(link));
    }
  }, [data, avatar]);

  return (
    <Spin size='large' tip='Loading User Detail' spinning={isLoading}>
      <div className='user-info-container'>
        <div className='first-section'>
          <Avatar
            size={128}
            style={{ fontSize: 64 }}
            {...(data?.avatar
              ? { src: `${avatar}` }
              : { style: { background: randAvaBg() } })}
          >
            {!data?.avatar &&
              data?.username!.substring(0, 1).toLocaleUpperCase()}
          </Avatar>
          <Upload className='upload-sec' {...avaFileProps}>
            <Button icon={<CameraOutlined />}>Upload your avatar</Button>
          </Upload>
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
