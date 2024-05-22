import React from "react";
import { Modal, Form, Input, Avatar, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./modal-department-manager.css";
import dayjs from "dayjs";
type ModalDepartmentManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
type ManagerInfoType = {
  avatar: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  birthDay: string;
  role: string;
};
export const ModalDepartmentManager = ({
  visible,
  setVisible,
}: ModalDepartmentManagerProps) => {
  const managerInfo: ManagerInfoType = {
    avatar: "",
    username: "vandiepdoan123",
    name: "Van Diep Doan",
    email: "vdd123@gmail.com",
    phone: "0972837293",
    birthDay: "1990-01-01",
    role: "Manager",
  };
  return (
    <>
      <Modal
        title="INFORMATION MANAGER"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={900}
      >
        <Form layout="vertical">
          <div className="main-layout">
            <div className="layout-1">
              <Form.Item className="avatar-manager-department">
                <Avatar
                  src={managerInfo.avatar}
                  icon={<UserOutlined />}
                  size={200}
                />
              </Form.Item>
              <Form.Item label="Role">
                <Input value={managerInfo.role} readOnly />
              </Form.Item>
            </div>
            <div className="layout-2">
              <Form.Item label="Username">
                <Input value={managerInfo.username} readOnly />
              </Form.Item>
              <Form.Item label="Name">
                <Input value={managerInfo.name} readOnly />
              </Form.Item>
            </div>
            <div className="layout-3">
                <Form.Item label="Email">
                  <Input value={managerInfo.email} readOnly />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input value={managerInfo.phone} readOnly />
                </Form.Item>
                <Form.Item label="birthday">
                  <DatePicker value={dayjs(managerInfo.birthDay)} format="DD/MM/YYYY" disabled />
                </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
