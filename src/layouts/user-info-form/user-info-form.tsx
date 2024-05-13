import "./user-info-form.css";
import { Form, Input, Button, DatePicker, Checkbox, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { OUserRole } from "src/share/models";
import { userRoleOptions } from "src/share/utils";

import type { UserRole, User } from "src/share/models";

export interface UserInfoType {
  username?: string;
  name: string;
  email: string;
  status: boolean;
  phone: string;
  birthDay: string;
  role?: UserRole;
}

interface UserFormProp {
  initValues?: UserInfoType | User;
}

export const UserInfoForm = ({ initValues }: UserFormProp) => {
  const onFinish = () => {};
  const newUserObj: UserInfoType = {
    birthDay: "",
    email: "",
    name: "",
    phone: "",
    status: true,
    role: OUserRole.Staff,
    username: "",
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(
      initValues
        ? {
            ...initValues,
            birthDay: dayjs(initValues?.birthDay, "YYYY/MM/DD"),
          }
        : { ...newUserObj }
    );
  });

  return (
    <Form
      form={form}
      name='user-info'
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      className='user-form'
    >
      <Form.Item<UserInfoType> label='username' name='username'>
        <Input />
      </Form.Item>
      <Form.Item<UserInfoType> label='Name' name='name'>
        <Input />
      </Form.Item>
      <Form.Item<UserInfoType> label='Email' name='email'>
        <Input />
      </Form.Item>
      <Form.Item<UserInfoType> label='Phone' name='phone'>
        <Input />
      </Form.Item>
      <Form.Item<UserInfoType> label='Birth Day' name='birthDay'>
        <DatePicker />
      </Form.Item>
      {!initValues && (
        <Form.Item<UserInfoType> label='Role' name='role'>
          <Select options={userRoleOptions} />
        </Form.Item>
      )}
      <Form.Item<UserInfoType>
        label='Status'
        name='status'
        valuePropName='checked'
      >
        <Checkbox>Active</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary'>Save Changes</Button>
      </Form.Item>
    </Form>
  );
};
