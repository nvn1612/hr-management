import React, { useState } from "react";
import { Modal, Table, Checkbox, Spin } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import { ModalAddStaffsDepartment } from "src/layouts/modal-departments/modal-add-staffs-department";
import "./modal-list-staff-department.css";
import { Department } from "src/share/models/departmentModels";
import { useGetDepartmentStaffsQuery } from "src/share/services";
import { useDeleteStaffDepartmentMutation } from "src/share/services";

type ModalDepartmentListStaffProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};

export const ModalListStaffDepartment = ({
  visible,
  setVisible,
  department
}: ModalDepartmentListStaffProps) => {
  const [visibleAddStaff, setVisibleAddStaff] = useState(false);
  const [listStaff, setListStaff] = useState<string[]>([]);
  const [checkedStaff, setCheckedStaff] = useState<{ [key: string]: boolean }>({});
  
  const showModalAddStaff = () => {
    setVisibleAddStaff(true);
  }

  const { data, isFetching, refetch } = useGetDepartmentStaffsQuery({ departmentId: department?.department_id });
  const [deleteStaff] = useDeleteStaffDepartmentMutation();

  const handleDeleteStaff = async () => {
    await deleteStaff({ departmentId: department?.department_id, listStaff }).unwrap().then(() => {
      setListStaff([]); 
      setCheckedStaff({}); 
      refetch(); 
    }).catch(err => console.error(err));
  }

  const handleCheckboxChange = (staffId: string, checked: boolean) => {
    setCheckedStaff(prevState => ({ ...prevState, [staffId]: checked }));
    if (checked) {
      setListStaff(prevState => [...prevState, staffId]);
    } else {
      setListStaff(prevState => prevState.filter(id => id !== staffId));
    }
  }

  const handleCancel = () => {
    setListStaff([]); 
    setCheckedStaff({}); 
    setVisible(false);
  }

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
      title: "Delete",
      key: "delete",
      render: (text: string, record: { key: string }) => (
        <Checkbox 
          checked={!!checkedStaff[record.key]} 
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)} 
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        title={`List Staffs of ${department?.name} Department`}
        open={visible}
        onOk={async () => {
          await handleDeleteStaff();
          setVisible(false);
        }}
        onCancel={handleCancel}
        width={900}
      >
        {isFetching ? (
          <Spin />
        ) : (
          <Table
            columns={columns}
            dataSource={data?.users.map((user) => ({
              key: user.user_id ?? '',
              name: user.name,
              username: user.username,
              email: user.email,
            }))}
            pagination={{ pageSize: 4 }}
          />
        )}
        <PlusSquareOutlined className="icon-add-staffs" onClick={showModalAddStaff} />
        <ModalAddStaffsDepartment visible={visibleAddStaff} setVisible={setVisibleAddStaff} department={department} />
      </Modal>
    </>
  );
};
