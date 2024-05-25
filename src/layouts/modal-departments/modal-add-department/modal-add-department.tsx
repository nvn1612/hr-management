import React, { useState } from "react";
import {
  Modal,
  Input,
  Select,
  Form,
  Button,
  message,
  Steps,
  theme,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ModalAddStaffsDepartment } from "../modal-add-staffs-department";
// import { useAddDepartmentMutation } from "src/share/services";
import { AddDepartmentStep1 } from "./add-department-step1";
import "./modal-add-department.css";
// import type { FormProps } from "antd";

const steps = [
  {
    title: "First",
    content: <AddDepartmentStep1/>,
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

type ModalAddDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface AddDepartmentForm {
  name: string;
  description: string;
}

export const ModalAddDepartment = ({
  visible,
  setVisible,
}: ModalAddDepartmentProps) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  // const [addDepartment] = useAddDepartmentMutation();
  // const [messageApi, contextHolder] = message.useMessage();
  // const onFinish: FormProps<AddDepartmentForm>["onFinish"] = async (values) => {
  //   await addDepartment(values)
  //     .unwrap()
  //     .then(() => messageApi.success("New dapartment was added"))
  //     .catch(() => messageApi.error("something went wrong"));
  // };


  const [showModalAddStaffs, setShowModalAddStaffs] = useState(false);

  const showlModal = () => {
    setShowModalAddStaffs(true);
  };
  return (
    <>
      {/* {contextHolder} */}
      <Modal
        title="Add Department"
        visible={visible}
        onOk={() => setVisible(false)}
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

        

        <ModalAddStaffsDepartment
          visible={showModalAddStaffs}
          setVisible={setShowModalAddStaffs}
        />
      </Modal>
    </>
  );
};

{
  /* <Form.Item
            label="Manager"
            name="Manafger"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select />
          </Form.Item> */
}

{
  /* <Form.Item
            name="Staffs"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <div className="label-icon-container">
              <span>Staffs</span>
              <PlusCircleOutlined
                className="icon-staffs"
                onClick={showlModal}
              />
            </div>
          </Form.Item> */
}
