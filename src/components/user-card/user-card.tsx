import "./user-card.css";
import { Card, Avatar } from "antd";
import { randAvaBg } from "src/share/utils";

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
        avatar={
          <Avatar size={64} style={{ background: randAvaBg(), fontSize: 32 }}>
            {username?.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        title={username}
        description={email}
      />
    </Card>
  );
};
