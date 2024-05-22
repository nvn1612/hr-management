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
import "./modal-departments.css";

import type { Department } from "src/share/models";

type ModalDepartmentsProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  departmentData?: Department;
};
export const ModalDepartments = ({
  visible,
  setVisible,
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Information",
      children: (
        <>
          <div className="information-departments">
            <p>
              The department's main task is to develop applications to serve the
              project including mobile applications and web applications.
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
                      <p>Van Diep Doan</p>
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
                      <p>10</p>
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
                onConfirm={() => console.log("Delete department")}
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
      children: <Projects />,
    },
    {
      key: "3",
      label: "Report",
      children: (
        <Timeline
          mode={"alternate"}
          items={[
            {
              color: "black",
              label: "2024-05-03",
              children: (
                <>
                  <Tag onClick={showReportProject}>DA6582</Tag>
                  <br />
                  <strong>Design UI</strong>
                  <p>
                    Design UI mockup 3 screens: home, detail, report - by Van
                    Tuan Tran
                  </p>
                  <p>Design UI mockup login screen - by Quoc Chinh Nguyen</p>
                  <strong>Develop mobile application</strong>
                  <p>Develop authentication feature - by The Hieu Pham</p>
                  <Tag onClick={showReportProject}>DA8642</Tag>
                  <br />
                  <strong>Develop algorithm</strong>
                  <p>Develop authentication feature - by The Hieu Pham</p>
                </>
              ),
            },
            {
              color: "red",
              label: "2024-05-02",
              children: (
                <>
                  <Tag onClick={showReportProject}>DA6582</Tag>
                  <br />
                  <strong>Design UI</strong>
                  <p>
                    Design UI mockup 3 screens: home, detail, report - by Van
                    Tuan Tran
                  </p>
                  <p>Design UI mockup login screen - by Quoc Chinh Nguyen</p>
                  <strong>Develop mobile application</strong>
                  <p>Develop authentication feature - by The Hieu Pham</p>
                  <Tag onClick={showReportProject}>DA8642</Tag>
                  <br />
                  <strong>Develop algorithm</strong>
                  <p>Develop authentication feature - by The Hieu Pham</p>
                </>
              ),
            },
            {
              color: "green",
              label: "2024-04-26",
              children: (
                <>
                  <Tag onClick={showReportProject}>DA6582</Tag>
                  <br />
                  <strong>Design UI</strong>
                  <p>
                    Design UI mockup 3 screens: home, detail, report - by Van
                    Tuan Tran
                  </p>
                  <p>Design UI mockup login screen - by Quoc Chinh Nguyen</p>
                  <strong>Develop mobile application</strong>
                  <p>Develop authentication feature - by The Hieu Pham</p>
                </>
              ),
            },
          ]}
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
      />
      <ModalListStaffDepartment
        visible={staffModalVisible}
        setVisible={setstaffModalVisible}
      />
      <ModalAddManager
        visible={addManagerVisibel}
        setVisible={setAddManagerVisible}
      />
      <ModalReportProjectDepartment
        visible={showReportProjectVisibel}
        setVisible={setshowReportProjectVisibel}
      />
    </>
  );
};
