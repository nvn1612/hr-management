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


const reportProject =
{
  "12-5-2024": [
    {
      "DA6582": [
        {
          "task1": [
            {
              "activity-1": "nguyen van A"
            },
            {
              "activity-2": "nguyen van B"
            }
          ]
        },
        {
          "task2": [
            {
              "activity-3": "nguyen van A"
            },
            {
              "activity-4": "nguyen van B"
            }
          ]
        }
      ]
    },
    {
      "DA6583": [
        {
          "task1": [
            {
              "activity-1": "nguyen van A"
            },
            {
              "activity-2": "nguyen van B"
            }
          ]
        },
        {
          "task2": [
            {
              "activity-3": "nguyen van A"
            },
            {
              "activity-4": "nguyen van B"
            }
          ]
        }
      ]
    },
  ],
  "6-6-2024": [
    {
      "DA6582": [
        {
          "task1": [
            {
              "activity-1": "nguyen van A"
            },
            {
              "activity-2": "nguyen van B"
            }
          ]
        },
        {
          "task2": [
            {
              "activity-3": "nguyen van A"
            },
            {
              "activity-4": "nguyen van B"
            }
          ]
        }
      ]
    },
    {
      "DA6583": [
        {
          "task1": [
            {
              "activity-1": "nguyen van A"
            },
            {
              "activity-2": "nguyen van B"
            }
          ]
        },
        {
          "task2": [
            {
              "activity-3": "nguyen van A"
            },
            {
              "activity-4": "nguyen van B"
            }
          ]
        }
      ]
    },
  ]
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
