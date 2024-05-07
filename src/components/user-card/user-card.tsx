import "./user-card.css";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { UserRole } from "src/share/models";

interface UserCardProps {
  username: string;
  role: UserRole;
  onClick?: () => void;
}

export const UserCard = ({ username, role, onClick }: UserCardProps) => {
  const { Meta } = Card;
  return (
    <Card
      className='user-card'
      onClick={onClick}
      style={onClick && { cursor: "pointer" }}
    >
      <Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={username}
        description={role}
      />
    </Card>
  );
};
