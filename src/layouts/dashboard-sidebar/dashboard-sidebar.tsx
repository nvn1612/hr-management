import React, { useState } from "react";
import "./dashboard-sidebar.css";
import { Link,} from "react-router-dom";
import { Avatar } from "antd";
import {
  TeamOutlined,
  ApartmentOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

const Dashboardsidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectInfo, setSelectInfo] = useState<boolean>(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <TeamOutlined />,
      label: "Accounts",
    },
    {
      key: "2",
      icon: <ApartmentOutlined />,
      label: "Departments ",
    },
    {
      key: "3",
      icon: <ProjectOutlined />,
      label: " Projects",
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Log Out",
    },
  ];

  return (
    <Layout>
      <Sider
        style={{ position: "absolute", zIndex: 10, height: "100dvh" }}
        className="sider"
        trigger={null}
        collapsible
        collapsed={!collapsed}
        onMouseEnter={() => setCollapsed(true)}
        onMouseLeave={() => setCollapsed(false)}
      >
        <div
          className={`side-avatar-containter ${collapsed && "extend-avatar"} ${
            selectInfo && "select-info"
          }`}
          onClick={() => setSelectInfo(true)}
        >
          <Avatar className="avatar-role" size={30} icon={<UserOutlined />} />
          {collapsed && <div className="avatar-text">User Role</div>}
        </div>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" {... selectInfo && {selectedKeys : ["0"]}}>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => setSelectInfo(false)}
            >
              <Link to={`/dashboard/${item.key}`}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content
          className="content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        </Content>
      </Layout>
    </Layout>
  );
};
export { Dashboardsidebar };
