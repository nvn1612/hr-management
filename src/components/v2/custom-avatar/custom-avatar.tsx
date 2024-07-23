import { Avatar } from "antd";
import { randAvaBg } from "src/share/utils";

interface AvatarProp {
  size: number;
  avatarSrc?: string;
  userName?: string;
}

export const CustomAvatar = ({ size, avatarSrc, userName }: AvatarProp) => {
  return (
    <Avatar
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: avatarSrc ? randAvaBg() : "none",
      }}
      src={avatarSrc || ""}
    >
      {userName && userName.substring(0, 1).toLocaleUpperCase()}
    </Avatar>
  );
};
