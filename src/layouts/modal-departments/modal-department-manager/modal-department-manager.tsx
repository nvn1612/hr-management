import React from "react";
import { Modal, Form, Input, Avatar, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./modal-department-manager.css";
import dayjs from "dayjs";
import { Department } from "src/share/models";
<<<<<<< HEAD
=======
import { randAvaBg } from "src/share/utils";
>>>>>>> main
type ModalDepartmentManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  manager?:string
  department?: Department
};

export const ModalDepartmentManager = ({
  visible,
  setVisible,
  department
}: ModalDepartmentManagerProps) => {
 

 


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
<<<<<<< HEAD
                <Avatar
                  // src={managerInfo.avatar}
                  icon={<UserOutlined />}
                  size={200}
                />
=======
              <Avatar
                          {...(!department?.information?.manager?.avatar && {
                            style: { background: randAvaBg(), fontSize: "80px" },
                          })}
                          size={160}
                        >
                          {!department?.information?.manager?.avatar &&
                            department?.information?.manager?.username
                              ?.substring(0, 1)
                              .toUpperCase()}
                        </Avatar>
>>>>>>> main
              </Form.Item>
              <Form.Item label="Role">
                <Input value="manager" readOnly />
              </Form.Item>
            </div>
            <div className="layout-2">
              <Form.Item label="Username">
                <Input value={department?.information?.manager?.username} readOnly />
              </Form.Item>
              <Form.Item label="Name">
                <Input value={department?.information?.manager?.name} readOnly />
              </Form.Item>
            </div>
            <div className="layout-3">
                <Form.Item label="Email">
                  <Input value={department?.information?.manager?.email} readOnly />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input value={department?.information?.manager?.phone} readOnly />
                </Form.Item>
                <Form.Item label="birthday">
                  <DatePicker value={department?.information?.manager?.birthday} format="DD/MM/YYYY" disabled />
                </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
