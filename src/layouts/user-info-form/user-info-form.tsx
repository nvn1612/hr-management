import { Form, Input, Button, Select, DatePicker, Checkbox } from "antd";
import "./user-info-form.css";
import dayjs from "dayjs";
import { OUserRole } from "src/share/models";
import { useEffect } from "react";

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
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...initValues,
      birthDay: dayjs(initValues?.birthDay, "YYYY/MM/DD"),
    });
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
      {initValues!.username && (
        <Form.Item<UserInfoType> label='username' name='username'>
          <Input />
        </Form.Item>
      )}
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
      <Form.Item<UserInfoType> label='Status' name='status'>
        <Checkbox defaultChecked={initValues!.status}>Active</Checkbox>
      </Form.Item>
      {initValues?.role && (
        <Form.Item<UserInfoType>
          initialValue={initValues?.role}
          label='Role'
          name='role'
        >
          <Select
            options={[
              { label: "Admin", value: OUserRole.Admin },
              { label: "Manager", value: OUserRole.Manager },
              { label: "Staff", value: OUserRole.Staff },
            ]}
          />
        </Form.Item>
      )}
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary'>Save Changes</Button>
      </Form.Item>
    </Form>
  );
};
