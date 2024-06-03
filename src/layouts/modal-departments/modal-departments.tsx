import React, { useState } from "react";
import {
  Modal,
  Tabs,
  Timeline,
  Tag,
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
} from "@ant-design/icons";
import { ModalDepartmentManager } from "src/layouts/modal-departments/modal-department-manager";
import { ModalListStaffDepartment } from "src/layouts/modal-departments/modal-list-staff-department";
import { ModalAddManager } from "src/layouts/modal-departments/modal-add-manager";
import { Projects } from "src/pages/dashboard/projects";
import { ModalReportProjectDepartment } from "src/layouts/modal-departments/modal-report-project-department";
import { Department } from "src/share/models/departmentModels";
import { Project } from "src/share/models/projectModels";
import { useDeleteDepartmentsMutation } from "src/share/services";
import { useGetReportDepartmentsQuery } from 'src/share/services/departmentServices'
import { useGetAllProjectDepartmentQuery } from "src/share/services/departmentServices";
import { ProjectCard } from "src/components/project-card";
import "./modal-departments.css";

type ModalDepartmentsProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};
export const ModalDepartments = ({
  visible,
  setVisible,
  department
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
  };
  const [addManagerVisibel, setAddManagerVisible] = useState(false);
  const showAddManager = () => {
    setAddManagerVisible(true);
  };
  const [showReportProjectVisibel, setshowReportProjectVisibel] =
    useState(false);
  const showReportProject = () => {
    setshowReportProjectVisibel(true);
  };

  const [deleteDepartment] = useDeleteDepartmentsMutation();
  const handleDeleteDepartment = async () => {
    await deleteDepartment({ departmentId: department?.department_id }).unwrap().then().catch()
  }
  const { data: reportData } = useGetReportDepartmentsQuery({ departmentId: department?.department_id })
  const { data: projectData } = useGetAllProjectDepartmentQuery({ departmentId: department?.department_id })
  console.log(department?.department_id)
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Information",
      children: (
        <>
          <div className="information-departments">
            <p>
              {department?.description}
            </p>
            <div className="info-department-wrapper">
              <div className="department-manager">
                <Row>
                  <Col span={10}>
                    <div className="title-manager-department">
                      <span>Manager</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      className="name-manager-department"
                      onClick={showModal}
                    >
                      <Avatar icon={<UserOutlined />} size={25} />
                      <p>{department?.information?.manager?.username}</p>
                    </div>
                  </Col>
                  <Col span={2} className="edit-manager-icon">
                    <div onClick={showAddManager}>
                      <EditOutlined />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="info-staffs-wrapper">
              <div className="department-staff">
                <Row>
                  <Col span={10}>
                    <div className="title-staff-department">
                      <span>Staff</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="number-staff-department">
                      <p>{department?.information?.total_staff}</p>
                    </div>
                  </Col>
                  <Col span={2} className="icon-list-staff-department">
                    <UnorderedListOutlined onClick={showModalStaff} />
                  </Col>
                </Row>
              </div>
            </div>
            <div className="delete-icon">
              <Popconfirm
                title="Are you sure to delete this department?"
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
        <ProjectCard onClick={() => console.log('hello world')} projectName={project.name} />
      )),
    },
    {
      key: "3",
      label: "Report",
      children: (
        <Timeline
          mode={"alternate"}
          items={reportData?.data?.map((item, index) => ({
            // color: item.color,
            // label: item.label,
            children: (
              <>
                <Tag onClick={showReportProject}>{item.project_id}</Tag>
                <br />
                <strong>{item.name}</strong>
                <p>{item.createdBy}</p>
                <p>{item.description}</p>
                <strong>{item.description}</strong>
                <p>{item.description}</p>
                <Tag onClick={showReportProject}>{item.description}</Tag>
                <br />
                <strong>{item.description}</strong>
                <p>{item.description}</p>
              </>
            ),
          }))}
        />
      ),
    },
  ];
  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="APPLICATION DEVELOPER DEPARTMENT"
        width={1000}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
