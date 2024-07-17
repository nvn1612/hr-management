import {
  TeamOutlined,
  ApartmentOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const navigateItem: MenuItem[] = [
  {
    key: "accounts",
    label: <Link to={"/dashboard"}>Account</Link>,
    icon: <TeamOutlined />,
  },
  {
    key: "department",
    label: "Department",
    icon: <ApartmentOutlined />,
  },
  {
    key: "project",
    label: "Project",
    icon: <ProjectOutlined />,
  },
];

export const Sidebar = () => {
  return <Menu items={navigateItem} />;
};
