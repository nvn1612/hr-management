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
import {
  useUpdateUserDetailMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} from "src/share/services/accountServices";

import type { User, CreateUserPartial } from "src/share/models";
import type { FormProps } from "antd";
import type { UserFormProp, UserInfoType } from "./models";

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
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const onFinish: FormProps<UserInfoType>["onFinish"] = async (values) => {
    setIsLoading(true);
    switch (action) {
      case "detail": {
        const sentValues = {
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
        break;
      }
      case "create": {
        const sentValues: CreateUserPartial = {
          password: values.password!,
          username: values.username!,
          email: values.email,
          role: values.role!,
        };
        await createUser(sentValues)
          .unwrap()
          .then(() => {
            setOpenAcountTab && setOpenAcountTab(false);
            messageApi.success("New user is created");
            setIsLoading(false);
          })
          .catch((e) => {
            messageApi.error(e.data.message);
            setIsLoading(false);
          });
        break;
      }
      case "update": {
        const sentValues: User = {
          ...values,
        };
        await updateUser({ values: sentValues, userId: initValues?.user_id })
          .unwrap()
          .then(() => {
            setOpenAcountTab && setOpenAcountTab(false);
            messageApi.success("user is updated created");
            setIsLoading(false);
          })
          .catch((e) => {
            messageApi.error(e.data.message);
            setIsLoading(false);
          });
      }
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
            birthday: dayjs(
              initValues.birthday
                ? initValues.birthday.substring(0, 10)
                : new Date()
            ),
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
          disabled={action === "create" ? false : !editableForm}
          name='user-info'
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          className='user-form'
        >
          <Form.Item<UserInfoType>
            label='Username'
            name='username'
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>
          {action === "create" && (
            <Form.Item<UserInfoType>
              label='Password'
              name='password'
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
          )}
          <Form.Item<UserInfoType>
            label='Email'
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input />
          </Form.Item>
          {action !== "create" && (
            <>
              <Form.Item<UserInfoType> label='Name' name='name'>
                <Input />
              </Form.Item>
              <Form.Item<UserInfoType> label='Phone' name='phone'>
                <Input />
              </Form.Item>
              <Form.Item<UserInfoType> label='Birth Day' name={"birthday"}>
                <DatePicker />
              </Form.Item>
            </>
          )}
          {!initValues && (
            <Form.Item<UserInfoType>
              label='Role'
              name='role'
              rules={[{ required: true, message: "Role is required" }]}
            >
              <Select options={userRoleOptions} />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type='primary' htmlType='submit'>
              {action === "create" ? "Create User" : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
