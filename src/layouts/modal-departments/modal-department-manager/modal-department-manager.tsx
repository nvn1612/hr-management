import React from "react";
import { Modal, Form, Input, Avatar, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./modal-department-manager.css";
import { useGetInfoManagerQuery } from "src/share/services";
import dayjs from "dayjs";
type ModalDepartmentManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  manager?:string
};

export const ModalDepartmentManager = ({
  visible,
  setVisible,
  manager
}: ModalDepartmentManagerProps) => {
  console.log(manager)

  const {data} = useGetInfoManagerQuery({ id: manager })
  console.log(data)


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
                  // src={managerInfo.avatar}
                  icon={<UserOutlined />}
                  size={200}
                />
              </Form.Item>
              <Form.Item label="Role">
                <Input value="manager" readOnly />
              </Form.Item>
            </div>
            <div className="layout-2">
              <Form.Item label="Username">
                <Input value={data?.username} readOnly />
              </Form.Item>
              <Form.Item label="Name">
                <Input value={data?.name} readOnly />
              </Form.Item>
            </div>
            <div className="layout-3">
                <Form.Item label="Email">
                  <Input value={data?.email} readOnly />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input value={data?.phone} readOnly />
                </Form.Item>
                <Form.Item label="birthday">
                  <DatePicker value={dayjs(data?.birthday)} format="DD/MM/YYYY" disabled />
                </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
