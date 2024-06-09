import { useState } from "react";
import { Button, Modal, Popconfirm, Spin, Tabs, message } from "antd";
import {
  useGetAllProjectDepartmentQuery,
  useDeleteProjectMutation,
} from "src/share/services";
import { ProjectCard } from "src/components/project-card";
import { ProjectWorkspace } from "src/layouts/project-workspace";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import "./tab-project-departments.css";
import type { TabsProps } from "antd";
import { Project } from "src/share/models";

export const TabProjectDepartment = ({
  department_id,
}: {
  department_id?: string;
}) => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: <ProjectInfo project={selectedProject} />,
    },
    {
      key: "2",
      label: "Workspace",
      children: <ProjectWorkspace project={selectedProject} />,
    },
    {
      key: "3",
      label: "Reports",
      children: <ProjectReports projectId={selectedProject?.project_id} />,
    },
  ];

  const { data: projectData, isFetching } = useGetAllProjectDepartmentQuery({
    departmentId: department_id,
  });
  const [deleteProject] = useDeleteProjectMutation();
  return (
    <>
      <Spin spinning={isFetching}>
        <div className="projects-tab-content">
          {projectData?.data.map((project: Project) => (
            <div className="project-card-department">
              <ProjectCard
                key={project.project_id}
                onClick={() => {
                  setOpenProjectTab(true);
                  setSelectedProject(project);
                }}
                projectName={project.name}
                description={project.description}
                information={project.information}
              />
            </div>
          ))}
        </div>
      </Spin>
      <Modal
        title={"Project Details"}
        className="project-detail-modal"
        open={openProjectTab}
        onCancel={() => {
          setOpenProjectTab(false);
        }}
        footer={[
          <Popconfirm
            title="Delete Project"
            description="Are you sure to delete this Project?"
            okText="Yes"
            onConfirm={async () => {
              await deleteProject(selectedProject!.project_id!)
                .unwrap()
                .then(() => {
                  message.success("Project deleted");
                  setOpenProjectTab(false);
                })
                .catch(() => {
                  message.error("Failed to delete project");
                });
            }}
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete Project
            </Button>
          </Popconfirm>,
        ]}
      >
        <Tabs items={tabsProps} className="project-tabs" />
      </Modal>
    </>
  );
};
