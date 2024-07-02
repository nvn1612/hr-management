import "./user-advance.css";
import {
  Button,
  Select,
  Typography,
  Row,
  Col,
  Popconfirm,
  message,
  Input,
} from "antd";
import { userRoleOptions } from "src/share/utils/role-selects";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
} from "src/share/services";

import type { UserRole } from "src/share/models";
import { useEffect, useState } from "react";

interface propsType {
  userRole?: UserRole;
  userId?: string;
  userEmail?: string;
}

export const UserAdvance = ({ userRole, userId, userEmail }: propsType) => {
  const { Text } = Typography;
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
    undefined
  );
  const [newPassword, setNewPassword] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();

  const confirmDeleteUser = async () => {
    await deleteUser({ userId })
      .then(() => {
        messageApi.success("Succesfully delete account");
      })
      .catch(() => {
        messageApi.error("Failed to delete account");
      });
  };

  const changeRole = async () => {
    await updateUser({ values: { role: selectedRole }, userId })
      .unwrap()
      .then(() => {
        messageApi.success("Succesfully changing role");
      })
      .catch(() => {
        messageApi.error("Failed to change role");
      });
  };

  useEffect(() => {
    setSelectedRole(undefined);
  }, [userRole]);

  return (
    <>
      {contextHolder}
      <div className='user-advance-tab'>
        <Row className='reset-password'>
          <Col span={4}>
            <Text>Reset Password</Text>
          </Col>
          <Col span={14}>
            <Input.Password
              placeholder='New password'
              className='new-password-input'
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Col>
          <Col span={6}>
            <Popconfirm
              title='Reset Password'
              description="Are you sure to reset this account's password ?"
              okText='Yes'
              cancelText='No'
              onConfirm={async () => {
                messageApi.loading("Changing Password");
                await changePassword({
                  email: userEmail,
                  password: newPassword,
                })
                  .unwrap()
                  .then(() => messageApi.success("Password changed"))
                  .catch(() => messageApi.error("Failed to change password"));
              }}
            >
              <Button type='primary' danger>
                Reset
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row className='reset-password'>
          <Col span={4}>
            <Text>Delete Account</Text>
          </Col>
          <Col offset={14} span={6}>
            <Popconfirm
              title='Delete Account'
              description='Are you sure to delete this account ?'
              okText='Yes'
              cancelText='No'
              onConfirm={confirmDeleteUser}
            >
              <Button type='primary' danger>
                Delete
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </>
  );
};
