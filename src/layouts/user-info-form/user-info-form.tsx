import { Form, Input, Button, Select } from "antd";
import "./user-info-form.css";

export interface UserInfoType {
  username?: string;
  fullname: string;
  email: string;
  address: string;
  role?: "admin" | "manager" | "staff";
}

interface UserFormProp {
  initValues: UserInfoType;
}

export const UserInfoForm = ({ initValues }: UserFormProp) => {
  const onFinish = () => {};

  return (
    <Form
      name='user-info'
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...initValues }}
      className='user-form'
    >
      {initValues.username && (
        <Form.Item<UserInfoType> label='username' name='username'>
          <Input />
        </Form.Item>
      )}
      <Form.Item<UserInfoType> label='Fullname' name='fullname'>
        <Input />
      </Form.Item>
      <Form.Item<UserInfoType> label='Email' name='email'>
        <Input />
      </Form.Item>
      <Form.Item<UserInfoType> label='Address' name='address'>
        <Input />
      </Form.Item>
      {initValues.role && (
        <Form.Item<UserInfoType> label='Role' name='role'>
          <Select options={[{ label: "Admin", value: "admin" }]} />
        </Form.Item>
      )}
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary'>Save Changes</Button>
      </Form.Item>
    </Form>
  );
};
