import React from "react";
import {
  TeamOutlined,
  ApartmentOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const navigateItem: MenuItem[] = [
  {
    key: "accounts",
    label: "Account",
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
