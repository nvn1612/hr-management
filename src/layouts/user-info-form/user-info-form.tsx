import "./user-info-form.css";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Select,
  Spin,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { userRoleOptions } from "src/share/utils";
import { useAddUserMutation } from "src/share/services/accountServices/";

import type { UserRole, User } from "src/share/models";
import type { FormProps } from "antd";

export interface UserInfoType {
  id?: number;
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
  setOpenAcountTab?: (isOpen: boolean) => void;
}

export const UserInfoForm = ({
  initValues,
  setOpenAcountTab,
}: UserFormProp) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation();

  const onFinish: FormProps<UserInfoType>["onFinish"] = async (values) => {
    if (!initValues) {
      const sentValues: User = {
        ...values,
        department: "",
        username: values.username ? values.username : "",
        role: values.role!,
      };
      await addUser(sentValues).unwrap();
      if (isSuccess && setOpenAcountTab) {
        setOpenAcountTab(false);
        messageApi.success("Successful add new user");
      } else if (isError) {
        messageApi.error("There wass an error");
      }
    }
  };
  const newUserObj: UserInfoType = {
    birthDay: "",
    email: "",
    name: "",
    phone: "",
    status: true,
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
    <>
      {contextHolder}
      <Spin
        spinning={isLoading}
        tip={initValues ? "Adding New Account" : "Progressing"}
        className='account-card-loading'
        size='large'
      >
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
      </Spin>
    </>
  );
};
