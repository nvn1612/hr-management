import { Avatar } from "antd";
import { CSSProperties, useState } from "react";
import { randAvaBg } from "src/share/utils";

interface AvatarProp {
  size?: number;
  avatarSrc?: string;
  userName?: string;
  style?: CSSProperties;
  className?: string;
}

export const CustomAvatar = ({
  size = 0,
  avatarSrc,
  userName,
  style,
  className,
}: AvatarProp) => {
  const [bgColor] = useState<"#f56a00" | "#87d068" | "#1677ff" | undefined>(
    randAvaBg()
  );
  return (
    <Avatar
      style={{
        ...(size && {
          width: `${size}px`,
          background: !avatarSrc ? bgColor : "none",
          height: `${size}px`,
          fontSize: `${size / 2}px`,
        }),
        ...style,
      }}
      className={className}
      src={avatarSrc || ""}
    >
      {userName && userName.substring(0, 1).toLocaleUpperCase()}
    </Avatar>
  );
};
