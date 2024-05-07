import React, { useState } from "react";
import "./dashboard-sidebar.css";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import {
  TeamOutlined,
  ApartmentOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
const { Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <TeamOutlined />,
    label: "Accounts",
    url: "accounts",
  },
  {
    key: "2",
    icon: <ApartmentOutlined />,
    label: "Departments ",
    url: "departments",
  },
  {
    key: "3",
    icon: <ProjectOutlined />,
    label: " Projects",
    url: "projects",
  },
  {
    key: "4",
    icon: <LogoutOutlined />,
    label: "Log Out",
  },
];

const Dashboardsidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string>("0");

  return (
    <Layout
      className={`sidebar-container ${
        collapsed && "extended-sidebar-container"
      }`}
    >
      <Sider
        style={{ position: "absolute", zIndex: 2, height: "100dvh" }}
        className='sider'
        trigger={null}
        collapsible
        collapsed={!collapsed}
        onMouseEnter={() => setCollapsed(true)}
        onMouseLeave={() => setCollapsed(false)}
      >
        <Link to={"/dashboard/user-info"}>
          <div
            className={`side-avatar-containter ${
              collapsed && "extended-avatar"
            } ${selectItem === "0" && "select-info"}`}
            onClick={() => {
              setSelectItem("0");
            }}
          >
            <Avatar className='avatar-role' size={30} icon={<UserOutlined />} />
            {collapsed && <div className='avatar-text'>User Role</div>}
          </div>
        </Link>
        <Menu theme='dark' mode='inline' selectedKeys={[selectItem]}>
          {menuItems.map((item, index) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => setSelectItem((index + 1).toString())}
            >
              {item.url ? (
                <Link to={`/dashboard/${item.url}`}>{item.label}</Link>
              ) : (
                item.label
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};
export { Dashboardsidebar };
