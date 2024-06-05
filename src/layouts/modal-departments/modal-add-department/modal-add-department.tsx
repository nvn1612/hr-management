import React, { useState } from "react";
import {
  Modal,
  Button,
  message,
  Steps,
  theme,
  Input,
  List,
  Avatar,
  Checkbox,
} from "antd";
import { useAddDepartmentMutation } from "src/share/services";
import { useGetUsersQuery } from "src/share/services";
import "./modal-add-department.css";
const { TextArea } = Input;



type ModalAddDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface AddDepartmentForm {
  name: string;
  description: string;
  managerId: string;
  staffs: string[];
}

export const ModalAddDepartment = ({
  visible,
  setVisible,
}: ModalAddDepartmentProps) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [listStaffs, setListStaffs] = useState<string[]>([]);
  const [manager, setManager] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const { data: managerData } = useGetUsersQuery({ role: "MANAGER" });
  const { data: staffData } = useGetUsersQuery({ role: "STAFF" });

  const handleCheckChangeStaff = (checked: boolean, userId: string | undefined) => {
    if (userId) {
      if (checked) {
        setListStaffs(prevStaffs => [...prevStaffs, userId]);
      } else {
        setListStaffs(prevStaffs => prevStaffs.filter(id => id !== userId));
      }
    }
  };

  const handleCheckChangeManager = (checked: boolean, ManagerId: string | undefined) => {
    if (ManagerId) {
      if (checked) {
        setManager(ManagerId); 
      } else {
        setManager(''); 
      }
    }
  };
  
  const steps = [
    {
      title: "First",
      content:
      <>
      <Input placeholder="Basic usage" value={name} onChange={e => setName(e.target.value)} />
      <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} value={description} onChange={e => setDescription(e.target.value)} />
    </>
      ,
    },
    {
      title: "Second",
      content:
        <>
          <List
            itemLayout="horizontal"
            dataSource={managerData?.users.filter(user => user.UserProperty?.department_id === null) ?? []}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={<a href="">{item.username}</a>}
                  description="this is manager"
                />
                <Checkbox onChange={(e) => handleCheckChangeManager(e.target.checked, item.user_id)} />
              </List.Item>
            )}
          />
        </>
      ,
    },
    {
      title: "Last",
      content:
        <>
          <List
            itemLayout="horizontal"
            dataSource={staffData?.users.filter(user => user.UserProperty?.department_id === null) ?? []}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={
                      <a href="">{item.username}</a>
                  }
                  description="this is staff"
                />

                  <Checkbox onChange={(e) => handleCheckChangeStaff(e.target.checked, item.user_id)} />
              </List.Item>
            )}
          />
        </>
      ,
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const [addDepartment] = useAddDepartmentMutation();
  const handleAddDepartment = async () => {
    try {
      await addDepartment({ name, description, managerId: manager, staffs: listStaffs });
      message.success("Department added successfully!");
      setVisible(false);
    } catch (error) {
      message.error("Failed to add department!");
    }
  };
  return (
    <>
      <Modal
        title="Add Department"
        visible={visible}
        onOk={handleAddDepartment}
        onCancel={() => setVisible(false)}
        okText="Save"
        className="modal-add-department"
        width={600}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

