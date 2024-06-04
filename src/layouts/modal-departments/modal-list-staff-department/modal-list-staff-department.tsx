import React,{useState} from "react";
import { Modal, Table, } from "antd";
import { MinusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { ModalAddStaffsDepartment } from "src/layouts/modal-departments/modal-add-staffs-department";
import "./modal-list-staff-department.css";
import {}

type ModalDepartmentListStaffProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    key: "action",
    render: () => <MinusCircleOutlined className="icon-delete-staff"/>,
  },
];

export const ModalListStaffDepartment = ({
  visible,
  setVisible,
}: ModalDepartmentListStaffProps) => {
  const [visibleAddStaff, setVisibleAddStaff] = useState(false);
  const showModalAddStaff = () => {
    setVisibleAddStaff(true);
  }
  const data = [
    {
      key: "1",
      name: "Van Diep Doan",
      username: "vanđiepdoan123",
      role: "manager",
    },
    {
      key: "2",
      name: "Nguyen Van A",
      username: "vana123",
      role: "staff",
    },
    {
      key: "3",
      name: "Nguyen Van B",
      username: "vanb123",
      role: "staff",
    },
    {
      key: "4",
      name: "Nguyen Van C",
      username: "vanc123",
      role: "staff",
    },
    {
      key: "5",
      name: "Nguyen Van D",
      username: "vanc123",
      role: "staff",
    },
  ];
  return (
    <>
      <Modal
        title="List Staffs Department"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={900}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 4 }}
        />
        <PlusSquareOutlined className="icon-add-staffs" onClick={showModalAddStaff}/>
        <ModalAddStaffsDepartment visible={visibleAddStaff} setVisible={setVisibleAddStaff} />
      </Modal>
    </>
  );
};