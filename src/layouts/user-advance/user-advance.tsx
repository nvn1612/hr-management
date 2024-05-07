import "./user-advance.css";
import { Button, Select, Typography, Row, Col } from "antd";
import { OUserRole } from "src/share/models";
import type { DefaultOptionType } from "antd/es/select";
import type { UserRole } from "src/share/models";

interface propsType {
  userRole: UserRole;
}

export const UserAdvance = ({ userRole }: propsType) => {
  const { Text } = Typography;

  const userRoleOptions: DefaultOptionType[] = [
    { label: <Text>Admin</Text>, value: OUserRole.Admin },
    { label: <Text>Manager</Text>, value: OUserRole.Manager },
    { label: <Text>Staff</Text>, value: OUserRole.Staff },
  ];

  return (
    <div className='user-advance-tab'>
      <Row className='reset-password'>
        <Col span={4}>
          <Text>Reset Password</Text>
        </Col>
        <Col offset={14} span={6}>
          <Button type='primary'>Reset</Button>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Text>User Role</Text>
        </Col>
        <Col span={14}>
          <Select
            className='role-selector'
            defaultValue={userRole}
            options={userRoleOptions}
          />
        </Col>
        <Col span={6}>
          <Button type='primary'>Save</Button>
        </Col>
      </Row>
    </div>
  );
};
