import React, { useState, useEffect } from "react";
import {
  Modal,
  Tabs,
  Timeline,
  TabsProps,
  Row,
  Col,
  Avatar,
  Popconfirm,
} from "antd";
import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { ModalDepartmentManager } from "src/layouts/modal-departments/modal-department-manager";
import { ModalListStaffDepartment } from "src/layouts/modal-departments/modal-list-staff-department";
import { ModalAddManager } from "src/layouts/modal-departments/modal-add-manager";
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

type ModalDepartmentsProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
  closeModal: () => void;
};

export const ModalDepartments = ({
  visible,
  setVisible,
  department,
  closeModal,
}: ModalDepartmentsProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const [managerModalVisible, setManagerModalVisible] = useState(false);
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
  const showReportProject = () => {
    setshowReportProjectVisibel(true);
  };

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
  const { data: projectData } = useGetAllProjectDepartmentQuery({
    departmentId: department?.department_id,
  });
  const reportTimelineItem = useHandleReports("department", reportData);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Information",
      children: (
        <>
          <div className='information-departments'>
            <div className="description-department">
              <BookOutlined />
              <p>{department?.description}</p>
            </div>
            <div className='info-department-wrapper'>
              <div className='department-manager'>
                <Row>
                  <Col span={10}>
                    <div className='title-manager-department'>
                      <span>Manager</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      className='name-manager-department'
                      onClick={showModal}
                    >
                      {department?.information?.manager?.user_id ? (
                        <Avatar icon={<UserOutlined />} size={25} />
                      ) : null}
                      <p>
                        {department?.information?.manager?.user_id
                          ? department.information.manager.name
                          : "No Manager"}
                      </p>
                    </div>
                  </Col>
                  <Col span={2} className='edit-manager-icon'>
                    <div onClick={showAddManager}>
                      <EditOutlined />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='info-staffs-wrapper'>
              <div className='department-staff'>
                <Row>
                  <Col span={10}>
                    <div className='title-staff-department'>
                      <span>Staff</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className='number-staff-department'>
                      <p>{department?.information?.total_staff}</p>
                    </div>
                  </Col>
                  <Col span={2} className='icon-list-staff-department'>
                    <UnorderedListOutlined onClick={showModalStaff} />
                  </Col>
                </Row>
              </div>
            </div>
            <div className='delete-icon'>
              <Popconfirm
                title='Are you sure to delete this department?'
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
      children: projectData?.data.map((project: Project, index: number) => (
        <ProjectCard
          onClick={() => console.log("hello world")}
          projectName={project.name}
        />
      )),
    },
    {
      key: "3",
      label: "Report",
      children: <Timeline mode={"left"} items={reportTimelineItem} />,
    },
  ];
  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title={department?.name}
        width={1000}
      >
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
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
