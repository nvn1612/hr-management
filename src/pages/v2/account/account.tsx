import { CardAccount } from "src/components/card-account";
import "./account.css";
import {
  Button,
  Col,
  Dropdown,
  Input,
  List,
  MenuProps,
  message,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ModalCreateUser from "src/components/modal-create-user";
export const Account = () => {
  const items: MenuProps["items"] = [
    {
      label: "Admin",
      key: "ADMIN",
    },
    {
      label: "Staff",
      key: "STAFF",
    },
    {
      label: "Project Manager",
      key: "PROJECT_MANAGER",
    },
    {
      label: "Manager",
      key: "MANAGER",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="v2-account-page">
      <section className="main">
        <header className="main-header">
          <section className="first-sec">
            <div className="title-des">
              <div className="title-row">
                <h2>Account</h2>
              </div>
            </div>
            <div className="action">
              <Space>
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Roles
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <Input placeholder="Search..." prefix={<SearchOutlined />} />
                <Button
                  type="default"
                  className="title-row-btn"
                  icon={<DeleteOutlined />}
                >
                  Trash
                </Button>
                <Button
                  type="primary"
                  className="title-row-btn"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Create User
                </Button>
              </Space>
            </div>
          </section>
        </header>
        <main>
          <List
            grid={{
              gutter: 12,
              xs: 2,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={[0, 1, 2, 4]}
            renderItem={() => (
              <List.Item>
                <CardAccount username="Datvu" />
              </List.Item>
            )}
          />
        </main>
      </section>
      <ModalCreateUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalCreateUser>
    </div>
  );
};
