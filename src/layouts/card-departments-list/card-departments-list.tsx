import React, { useState } from "react";
import { Col, Row } from "antd";
import {PlusCircleOutlined } from "@ant-design/icons";
import { ModalDepartments } from "src/layouts/modal-departments";
import { CardDepartmentss } from "src/components/card-departments";
import { ModalAddDepartment } from "../modal-departments/modal-add-department";
import { MngPageHeader } from "../mng-page-header";
import { useGetDepartmentsQuery } from "src/share/services";
import "./card-departments-list.css";

// type DepartmentData= {
//   title: string;
//   manager: string;
//   staffCount: number;
// };

export const CardDepartments = () => {
  const [visible, setVisible] = useState(false);
  const [visibleAddDepartment, setVisibleAddDepartment] = useState(false);
  const showAddDepartment = () => {
    setVisibleAddDepartment(true);
  };
  // const departments: DepartmentData[] = [
  //   {
  //     title: "APPLICATION DEVELOPER DEPARTMENT",
  //     manager: "Van Diep Tran",
  //     staffCount: 20,
  //   },
  //   {
  //     title: "INFORMATION SECURITY DEPARTMENT",
  //     manager: "Tung Hoang",
  //     staffCount: 7,
  //   },
  //   {
  //     title: "INFORMATION SECURITY DEPARTMENT",
  //     manager: "Tung Hoang",
  //     staffCount: 7,
  //   },
  //   {
  //     title: "INFORMATION SECURITY DEPARTMENT",
  //     manager: "Tung Hoang",
  //     staffCount: 7,
  //   },
  // ];
  const {data} =useGetDepartmentsQuery();
  return (
    <Row gutter={16} className="departments">
      <MngPageHeader
        title="Departments"
        addBtnContent='Create Department'
        filters={[]}
      />

        

      {data?.data.departments.map((department) => (
        <Col span={8}>
          <CardDepartmentss
            title={department.name}
            manager={department.manager_id}
            onClick={() => setVisible(true)}
          />
        </Col>
      ))}
      <Col span={8} className="add-department-icon">
          <PlusCircleOutlined 
          className="icon-add-department"
          onClick={showAddDepartment}
        />
      </Col>
      <ModalDepartments visible={visible} setVisible={setVisible} />
      <ModalAddDepartment visible={visibleAddDepartment} setVisible={setVisibleAddDepartment} />
    </Row>
  );
};
