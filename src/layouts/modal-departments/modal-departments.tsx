import React from "react";
import { Modal, Tabs } from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';
import type { TabsProps } from "antd";
import "./modal-departments.css";
type ModalDepartmentsProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModalDepartments = ({ visible, setVisible }: ModalDepartmentsProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Information",
      children: (
        <>
          <div className="information-departments">
            <p>
              The department's main task is to develop applications to serve the
              project including mobile applications and web applications.
            </p>

          <div className="department-manager">
              <span>Manager</span>
              <p>Van Diep Doan</p>
              <UnorderedListOutlined/>
            </div>
          </div>
          <div className="information-staffs-departments">

            <div className="department-staff">
              <span>Staff</span>
              <p>10</p>
              <UnorderedListOutlined />
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Projects",
      children: "",
    },
    {
      key: "3",
      label: "Report",
      children: "",
    },
  ];
  return (
    <div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="APPLICATION DEVELOPER DEPARTMENT"
        width={1000}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </div>
  );
};
