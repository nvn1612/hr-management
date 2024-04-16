import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AccountBookOutlined, BankOutlined , ProjectOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export const MenuItems: React.FC = () => {
  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          User information
        </Menu.Item>
        <Menu.Item key="2" icon={<AccountBookOutlined />}>
          Manage account 
        </Menu.Item>
        <Menu.Item key="3" icon={<BankOutlined />}>
          Manage department
        </Menu.Item>
        <Menu.Item key = "4" icon = {<ProjectOutlined />}>
            Manage project
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

