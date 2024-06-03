import React,{useState} from "react";
import { Modal, Table, } from "antd";
import { MinusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { ModalAddStaffsDepartment } from "src/layouts/modal-departments/modal-add-staffs-department";
import "./modal-list-staff-department.css";
import { Department } from "src/share/interfaces/department";
import { useGetDepartmentStaffsQuery } from "src/share/services";

type ModalDepartmentListStaffProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
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
    title: "email",
    dataIndex: "email",
    key: "email",
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
  department
}: ModalDepartmentListStaffProps) => {
  const [visibleAddStaff, setVisibleAddStaff] = useState(false);
  const showModalAddStaff = () => {
    setVisibleAddStaff(true);
  }
  

  const {data} = useGetDepartmentStaffsQuery({departmentId:department?.department_id});

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
          dataSource={data?.users.map((user) => ({
            key: user.user_id,
            name: user.name,
            username: user.username,
            email: user.email,
          }))
          }
          pagination={{ pageSize: 4 }}
        />
        <PlusSquareOutlined className="icon-add-staffs" onClick={showModalAddStaff}/>
        <ModalAddStaffsDepartment visible={visibleAddStaff} setVisible={setVisibleAddStaff} />
      </Modal>
    </>
  );
};