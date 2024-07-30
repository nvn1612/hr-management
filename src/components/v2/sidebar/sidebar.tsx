import "./sidebar.css";
import {
  TeamOutlined,
  ApartmentOutlined,
  ProjectOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Menu, Typography, Layout } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const navigateItem: MenuItem[] = [
  {
    key: "accounts",
    label: (
      <Link className='sidebar-link' to={"/dashboard"}>
        <Typography.Text className='Menu'>Account </Typography.Text>
        <PlusSquareOutlined onClick={() => {}} />
      </Link>
    ),
    icon: <TeamOutlined />,
  },
  {
    key: "department",
    label: (
      <Link className='sidebar-link' to={"/dashboard"}>
        Department <PlusSquareOutlined onClick={() => {}} />
      </Link>
    ),
    icon: <ApartmentOutlined />,
  },
  {
    key: "project",
    label: (
      <Link className='sidebar-link' to={"/dashboard"}>
        Project <PlusSquareOutlined onClick={() => {}} />
      </Link>
    ),
    icon: <ProjectOutlined />,
  },
];

export const Sidebar = () => {
  return (
    <Layout.Sider className='sidebar'>
      <Menu items={navigateItem} />
    </Layout.Sider>
  );
};
