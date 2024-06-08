<<<<<<< HEAD
import React,{useState} from "react";
import { Modal, Table, Checkbox,Spin } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import { ModalAddStaffsDepartment } from "src/layouts/modal-departments/modal-add-staffs-department";
import "./modal-list-staff-department.css";
import {Department} from "src/share/models/departmentModels";
=======
import React, { useState } from "react";
import { Modal, Table, Checkbox, Spin } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import { ModalAddStaffsDepartment } from "src/layouts/modal-departments/modal-add-staffs-department";
import "./modal-list-staff-department.css";
import { Department } from "src/share/models/departmentModels";
>>>>>>> main
import { useGetDepartmentStaffsQuery } from "src/share/services";
import { useDeleteStaffDepartmentMutation } from "src/share/services";

type ModalDepartmentListStaffProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};

<<<<<<< HEAD



=======
>>>>>>> main
export const ModalListStaffDepartment = ({
  visible,
  setVisible,
  department
}: ModalDepartmentListStaffProps) => {
  const [visibleAddStaff, setVisibleAddStaff] = useState(false);
  const [listStaff, setListStaff] = useState<string[]>([]);
<<<<<<< HEAD
  const showModalAddStaff = () => {
    setVisibleAddStaff(true);
  }
  const {data,isFetching} = useGetDepartmentStaffsQuery({departmentId:department?.department_id});
  const [deleteStaff] = useDeleteStaffDepartmentMutation();

  const handleDeleteStaff = async () => {
    await deleteStaff({departmentId:department?.department_id, listStaff: listStaff}).unwrap().then().catch()
  }

  const handleCheckboxChange = (staffId: string, checked: boolean) => {
=======
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
>>>>>>> main
    if (checked) {
      setListStaff(prevState => [...prevState, staffId]);
    } else {
      setListStaff(prevState => prevState.filter(id => id !== staffId));
    }
  }
<<<<<<< HEAD
  
=======

  const handleCancel = () => {
    setListStaff([]); 
    setCheckedStaff({}); 
    setVisible(false);
  }

>>>>>>> main
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
<<<<<<< HEAD
        <Checkbox onChange={(e) => handleCheckboxChange(record.key, e.target.checked)} />
=======
        <Checkbox 
          checked={!!checkedStaff[record.key]} 
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)} 
        />
>>>>>>> main
      ),
    },
  ];

<<<<<<< HEAD


  
  return (
    <>
      <Modal
        title="List Staffs Department"
=======
  return (
    <>
      <Modal
        title={`List Staffs of ${department?.name} Department`}
>>>>>>> main
        open={visible}
        onOk={async () => {
          await handleDeleteStaff();
          setVisible(false);
        }}
<<<<<<< HEAD
        onCancel={() => setVisible(false)}
=======
        onCancel={handleCancel}
>>>>>>> main
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
<<<<<<< HEAD
        <PlusSquareOutlined className="icon-add-staffs" onClick={showModalAddStaff}/>
=======
        <PlusSquareOutlined className="icon-add-staffs" onClick={showModalAddStaff} />
>>>>>>> main
        <ModalAddStaffsDepartment visible={visibleAddStaff} setVisible={setVisibleAddStaff} department={department} />
      </Modal>
    </>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> main
