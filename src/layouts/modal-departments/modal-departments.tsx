<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> main
import {
  Modal,
  Tabs,
  Timeline,
  TabsProps,
  Row,
  Col,
  Avatar,
  Popconfirm,
<<<<<<< HEAD
=======
  Button,
  message,
  Spin,
>>>>>>> main
} from "antd";
import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
<<<<<<< HEAD
=======
  BookOutlined,
>>>>>>> main
} from "@ant-design/icons";
import { ModalDepartmentManager } from "src/layouts/modal-departments/modal-department-manager";
import { ModalListStaffDepartment } from "src/layouts/modal-departments/modal-list-staff-department";
import { ModalAddManager } from "src/layouts/modal-departments/modal-add-manager";
<<<<<<< HEAD
import { Projects } from "src/pages/dashboard/projects";
import { ModalReportProjectDepartment } from "src/layouts/modal-departments/modal-report-project-department";
import { Department } from "src/share/models/departmentModels";
import { Project } from "src/share/models/projectModels";
import { useDeleteDepartmentsMutation } from "src/share/services";
import { useGetReportDepartmentsQuery } from "src/share/services/departmentServices";
import { useGetAllProjectDepartmentQuery } from "src/share/services/departmentServices";
import { ProjectCard } from "src/components/project-card";
import "./modal-departments.css";
import { useHandleReports } from "src/share/hooks";
=======
import { ModalReportProjectDepartment } from "src/layouts/modal-departments/modal-report-project-department";
import { Department } from "src/share/models/departmentModels";
import { Project } from "src/share/models/projectModels";
import {
  useDeleteDepartmentsMutation,
  useDeleteProjectMutation,
} from "src/share/services";
import { useGetReportDepartmentsQuery } from "src/share/services/departmentServices";
import { useGetAllProjectDepartmentQuery } from "src/share/services/departmentServices";
import "./modal-departments.css";
import { useHandleReports } from "src/share/hooks";
import { TabProjectDepartment } from "./tab-project-departments";
import { randAvaBg } from "src/share/utils";
>>>>>>> main

type ModalDepartmentsProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
  closeModal: () => void;
};

<<<<<<< HEAD


=======
>>>>>>> main
export const ModalDepartments = ({
  visible,
  setVisible,
  department,
<<<<<<< HEAD
  closeModal
=======
  closeModal,
>>>>>>> main
}: ModalDepartmentsProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

<<<<<<< HEAD

  const [managerModalVisible, setManagerModalVisible] = useState(false);
=======
  const [managerModalVisible, setManagerModalVisible] = useState(false);

>>>>>>> main
  const showModal = () => {
    setManagerModalVisible(true);
  };
  const [staffModalVisible, setstaffModalVisible] = useState(false);
  const showModalStaff = () => {
    setstaffModalVisible(true);
    closeModal();
  };
  const [addManagerVisibel, setAddManagerVisible] = useState(false);
  const showAddManager = () => {
    setAddManagerVisible(true);
    closeModal();
  };
  const [showReportProjectVisibel, setshowReportProjectVisibel] =
    useState(false);
<<<<<<< HEAD
  const showReportProject = () => {
    setshowReportProjectVisibel(true);
  };
=======
>>>>>>> main

  const [deleteDepartment] = useDeleteDepartmentsMutation();
  const handleDeleteDepartment = async () => {
    await deleteDepartment({ departmentId: department?.department_id })
      .unwrap()
      .then()
      .catch();
  };
  const { data: reportData } = useGetReportDepartmentsQuery({
    departmentId: department?.department_id,
  });
<<<<<<< HEAD
  const { data: projectData } = useGetAllProjectDepartmentQuery({
    departmentId: department?.department_id,
  });
  const reportTimelineItem = useHandleReports("department", reportData);
=======

  const reportTimelineItem = useHandleReports("department", reportData);

>>>>>>> main
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Information",
      children: (
        <>
<<<<<<< HEAD
          <div className='information-departments'>
            <p>{department?.description}</p>
            <div className='info-department-wrapper'>
              <div className='department-manager'>
                <Row>
                  <Col span={10}>
                    <div className='title-manager-department'>
=======
          <div className="information-departments">
            <div className="description-department">
              <BookOutlined />
              <p>{department?.description}</p>
            </div>
            <div className="info-department-wrapper">
              <div className="department-manager">
                <Row>
                  <Col span={10}>
                    <div className="title-manager-department">
>>>>>>> main
                      <span>Manager</span>
                    </div>
                  </Col>
                  <Col span={12}>
<<<<<<< HEAD
                    <div className='name-manager-department' onClick={showModal}>
                      {department?.information?.manager?.user_id ? (
                        <Avatar icon={<UserOutlined />} size={25} />
                      ) : null}
                      <p>{department?.information?.manager?.user_id ? department.information.manager.name : "No Manager"}</p>
                    </div>
                  </Col>
                  <Col span={2} className='edit-manager-icon'>
=======
                    <div
                      className="name-manager-department"
                      onClick={showModal}
                    >
                      {department?.information?.manager?.user_id ? (
                        <Avatar
                          {...(!department?.information?.manager?.avatar && {
                            style: { background: randAvaBg() },
                          })}
                          size={25}
                        >
                          {!department?.information?.manager?.avatar &&
                            department?.information?.manager?.username
                              ?.substring(0, 1)
                              .toUpperCase()}
                        </Avatar>
                      ) : null}
                      <p>
                        {department?.information?.manager?.user_id
                          ? department.information.manager.name
                          : "No Manager"}
                      </p>
                    </div>
                  </Col>
                  <Col span={2} className="edit-manager-icon">
>>>>>>> main
                    <div onClick={showAddManager}>
                      <EditOutlined />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
<<<<<<< HEAD
            <div className='info-staffs-wrapper'>
              <div className='department-staff'>
                <Row>
                  <Col span={10}>
                    <div className='title-staff-department'>
=======
            <div className="info-staffs-wrapper">
              <div className="department-staff">
                <Row>
                  <Col span={10}>
                    <div className="title-staff-department">
>>>>>>> main
                      <span>Staff</span>
                    </div>
                  </Col>
                  <Col span={12}>
<<<<<<< HEAD
                    <div className='number-staff-department'>
                      <p>{department?.information?.total_staff}</p>
                    </div>
                  </Col>
                  <Col span={2} className='icon-list-staff-department'>
=======
                    <div className="number-staff-department">
                      <p>{department?.information?.total_staff}</p>
                    </div>
                  </Col>
                  <Col span={2} className="icon-list-staff-department">
>>>>>>> main
                    <UnorderedListOutlined onClick={showModalStaff} />
                  </Col>
                </Row>
              </div>
            </div>
<<<<<<< HEAD
            <div className='delete-icon'>
              <Popconfirm
                title='Are you sure to delete this department?'
=======
            <div className="delete-icon">
              <Popconfirm
                title="Are you sure to delete this department?"
>>>>>>> main
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => {
                  handleDeleteDepartment().then(() => {
                    setVisible(false);
                  });
                }}
              >
                <DeleteOutlined />
              </Popconfirm>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Projects",
<<<<<<< HEAD
      children: projectData?.data.map((project: Project, index: number) => (
        <ProjectCard
          onClick={() => console.log("hello world")}
          projectName={project.name}
        />
      )),
=======
      children: (
        <TabProjectDepartment department_id={department?.department_id} />
      ),
>>>>>>> main
    },
    {
      key: "3",
      label: "Report",
<<<<<<< HEAD
      children: <Timeline mode={"alternate"} items={reportTimelineItem} />,
    },
  ];
=======
      children: <Timeline mode={"left"} items={reportTimelineItem} />,
    },
  ];

>>>>>>> main
  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title={department?.name}
        width={1000}
      >
<<<<<<< HEAD
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
=======
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
>>>>>>> main
      </Modal>
      <ModalDepartmentManager
        visible={managerModalVisible}
        setVisible={setManagerModalVisible}
        department={department}
      />
      <ModalListStaffDepartment
        visible={staffModalVisible}
        setVisible={setstaffModalVisible}
        department={department}
      />
      <ModalAddManager
        visible={addManagerVisibel}
        setVisible={setAddManagerVisible}
        department={department}
      />
      <ModalReportProjectDepartment
        visible={showReportProjectVisibel}
        setVisible={setshowReportProjectVisibel}
      />
    </>
  );
};
