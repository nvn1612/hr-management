import React,{useState} from "react";
import { Modal, Input, Select, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ModalAddStaffsDepartment } from "../modal-add-staffs-department";
import "./modal-add-department.css";
type ModalAddDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModalAddDepartment = ({
  visible,
  setVisible,
}: ModalAddDepartmentProps) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const [showModalAddStaffs, setShowModalAddStaffs] = useState(false);
  const showlModal = () => {
    setShowModalAddStaffs(true); 
  }
  return (
    <>
      <Modal
        title="Add Department"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        okText="Save"
        className="modal-add-department"
        width={600}
      >
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
          <Form.Item
            label="Name Department"
            name="Name Department"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Manager"
            name="Manafger"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            name="Staffs"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <div className="label-icon-container">
              <span>Staffs</span>
              <PlusCircleOutlined className="icon-staffs" onClick={showlModal}/>
            </div>
          </Form.Item>
        </Form>
        <ModalAddStaffsDepartment visible={showModalAddStaffs} setVisible={setShowModalAddStaffs}/>
      </Modal>
    </>
  );
};
