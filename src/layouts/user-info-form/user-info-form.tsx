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
import { useEffect, useState } from "react";
import { userRoleOptions } from "src/share/utils";
import { useUpdateUserDetailMutation } from "src/share/services/accountServices";

import type { UserRole, User } from "src/share/models";
import type { FormProps } from "antd";

// types
export interface UserInfoType {
  user_id?: string;
  username?: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  role?: UserRole;
}

interface UserFormProp {
  initValues?: UserInfoType | User;
  setOpenAcountTab?: (isOpen: boolean) => void;
  action: "create" | "detail" | "update";
}
//

export const UserInfoForm = ({
  initValues,
  setOpenAcountTab,
  action,
}: UserFormProp) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editableForm, setEditableForm] = useState<boolean>(
    initValues ? false : true
  );
  const [updateUserDetail] = useUpdateUserDetailMutation();

  const onFinish: FormProps<UserInfoType>["onFinish"] = async (values) => {
    let sentValues: User;
    setIsLoading(true);
    switch (action) {
      case "detail":
        sentValues = {
          ...values,
          username: values.username ? values.username : "",
        };
        await updateUserDetail(sentValues)
          .unwrap()
          .then(() => {
            setOpenAcountTab && setOpenAcountTab(false);
            messageApi.success("Successful update");
            setIsLoading(false);
          })
          .catch(() => {
            messageApi.error("Something went wrong");
            setIsLoading(false);
          });
    }
  };

  const newUserObj: UserInfoType = {
    birthday: "",
    email: "",
    name: "",
    phone: "",
    username: "",
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(
      initValues
        ? {
            ...initValues,
            birthDay: dayjs(initValues?.birthday, "YYYY/MM/DD"),
          }
        : { ...newUserObj }
    );
  });

  return (
    <>
      {contextHolder}
      <Spin
        spinning={isLoading}
        tip='Progressing'
        className='account-card-loading'
        size='large'
      >
        {(action === "detail" || action === "update") && (
          <Checkbox
            checked={editableForm}
            onChange={() => setEditableForm(!editableForm)}
          >
            Edit Infomation
          </Checkbox>
        )}
        <Form
          form={form}
          disabled={!editableForm}
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
          <Form.Item<UserInfoType> label='Birth Day' name='birthday'>
            <DatePicker />
          </Form.Item>
          {!initValues && (
            <Form.Item<UserInfoType> label='Role' name='role'>
              <Select options={userRoleOptions} />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type='primary' htmlType='submit'>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
