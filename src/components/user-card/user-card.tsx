import "./user-card.css";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserCardProps {
  username?: string;
  email?: string;
  onClick?: () => void;
}

export const UserCard = ({ username, email, onClick }: UserCardProps) => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      className='user-card'
      onClick={onClick}
      style={onClick && { cursor: "pointer" }}
    >
      <Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={username}
        description={email}
      />
    </Card>
  );
};
