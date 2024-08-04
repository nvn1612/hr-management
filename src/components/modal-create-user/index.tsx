import {
  Button,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  message,
  Modal,
  Space,
} from "antd";
import React from "react";
import "./modal-create-user.css";
import { DownOutlined } from "@ant-design/icons";
type ModalCreateUser = {
  isModalOpen: boolean;
  setIsModalOpen: any;
};
const ModalCreateUser: React.FC<ModalCreateUser> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Modal
      className="wrapper"
      open={isModalOpen}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Create User
      </h2>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div>
          <span>Name</span>
          <Input placeholder="Name..." size="large" />
        </div>
        <div>
          <span>Username</span>
          <Input placeholder="Username..." size="large" />
        </div>
        <div>
          <span>Phone</span>
          <Input placeholder="Phone..." size="large" />
        </div>
        <div>
          <span>Email</span>
          <Input placeholder="Email..." size="large" />
        </div>
        <div>
          <span>Birthday</span>
          <DatePicker
            placeholder="Birthday..."
            size="large"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <span>Roles</span>
          <Dropdown menu={menuProps}>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </Space>
    </Modal>
  );
};

export default ModalCreateUser;
