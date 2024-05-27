import "./user-advance.css";
import {
  Button,
  Select,
  Typography,
  Row,
  Col,
  Popconfirm,
  message,
} from "antd";
import { OUserRole } from "src/share/models";
import { userRoleOptions } from "src/share/utils/role-selects";
import {
  useDeleteUserMutation,
  useGetRoleQuery,
  useUpdateUserMutation,
} from "src/share/services";

import type { UserRole } from "src/share/models";
import { useEffect, useState } from "react";

interface propsType {
  userRoleId?: string;
  userId?: string;
}

export const UserAdvance = ({ userRoleId, userId }: propsType) => {
  const { Text } = Typography;
  const [selectedRole, setSelectedRole] = useState<UserRole>(OUserRole.Staff);
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetRoleQuery();

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
    const roleId = data?.find((role) => role.name === selectedRole)?.role_id;
    await updateUser({ values: { UserProperty: { role_id: roleId } }, userId })
      .unwrap()
      .then(() => {
        messageApi.success("Succesfully changing role");
      })
      .catch(() => {
        messageApi.error("Failed to change role");
      });
  };
  const updateRole = () => {
    const roleResult = data?.find((role) => role.role_id === userRoleId)
      ?.name as UserRole;
    setSelectedRole(roleResult);
  };

  useEffect(() => {
    updateRole();
  }, [userRoleId]);

  return (
    <>
      {contextHolder}
      <div className='user-advance-tab'>
        <Row>
          <Col span={4}>
            <Text>User Role</Text>
          </Col>
          <Col span={14}>
            <Select
              className='role-selector'
              value={selectedRole ? selectedRole : OUserRole.Staff}
              options={userRoleOptions}
              onChange={(value: UserRole) => setSelectedRole(value)}
            />
          </Col>
          <Col span={6}>
            <Popconfirm
              title='Changing Role'
              description="Are you sure to chnage this account's role ?"
              okText='Yes'
              cancelText='No'
              onConfirm={changeRole}
            >
              <Button type='primary'>Save</Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row className='reset-password'>
          <Col span={4}>
            <Text>Reset Password</Text>
          </Col>
          <Col offset={14} span={6}>
            <Popconfirm
              title='Reset Password'
              description="Are you sure to reset this account's password ?"
              okText='Yes'
              cancelText='No'
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
