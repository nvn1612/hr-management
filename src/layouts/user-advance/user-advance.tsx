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
import { useDeleteUserMutation } from "src/share/services";

import type { UserRole } from "src/share/models";

interface propsType {
  userRole?: UserRole;
  userId?: string;
}

export const UserAdvance = ({ userRole, userId }: propsType) => {
  const { Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteUser] = useDeleteUserMutation();
  const confirmDeleteUser = async () => {
    await deleteUser({ userId })
      .then(() => {
        messageApi.success("Succesfully delete account");
      })
      .catch(() => {
        messageApi.error("Failed to delete account");
      });
  };

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
              defaultValue={userRole ? userRole : OUserRole.Staff}
              options={userRoleOptions}
            />
          </Col>
          <Col span={6}>
            <Button type='primary'>Save</Button>
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
