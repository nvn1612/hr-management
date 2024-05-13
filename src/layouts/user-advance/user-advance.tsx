import "./user-advance.css";
import { Button, Select, Typography, Row, Col, Popconfirm } from "antd";
import { OUserRole } from "src/share/models";
import { userRoleOptions } from "src/share/utils/role-selects";

import type { UserRole } from "src/share/models";

interface propsType {
  userRole?: UserRole;
}

export const UserAdvance = ({ userRole }: propsType) => {
  const { Text } = Typography;

  return (
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
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};
