import "./projects.css";
import { useState } from "react";
import { Tabs, Modal, Popconfirm, Button, List, message, Spin } from "antd";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import { ProjectWorkspace } from "src/layouts/project-workspace";
import { ProjectCard } from "src/components/project-card";
import { MngPageHeader } from "src/layouts/mng-page-header";
import {
  useGetAllProjectQuery,
  useDeleteProjectMutation,
} from "src/share/services";

import type { TabsProps, PaginationProps } from "antd";
import type { Project } from "src/share/models";

export const Projects = () => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [queries, setQueries] = useState<{
    page: number;
  }>({ page: 1 });
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isFetching } = useGetAllProjectQuery({ ...queries });
  const [deleteProject] = useDeleteProjectMutation();

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
      children: <ProjectReports />,
    },
  ];

  const createProjectTab: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: <ProjectInfo project={undefined} />,
    },
  ];

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  return (
    <>
      {contextHolder}
      <Spin
        spinning={isFetching}
        tip='Loading Projects'
        className='project-card-loading'
        size='large'
      >
        <MngPageHeader
          title='Projects'
          addBtnContent='Create Project'
          itemCount={data?.total}
          addBtnOnClick={() => {
            setIsCreate(true);
            setOpenProjectTab(true);
          }}
        />
        <div className='project-card-container'>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: 10,
              total: data?.total,
              onChange: onChangePage,
            }}
            dataSource={data?.data}
            renderItem={
              data
                ? (project) => {
                    return (
                      <List.Item>
                        <ProjectCard
                          onClick={() => {
                            setOpenProjectTab(true);
                            setSelectedProject(project);
                            setIsCreate(false);
                          }}
                          projectName={project?.name}
                          description={project.description}
                          information={project.information}
                        />
                      </List.Item>
                    );
                  }
                : undefined
            }
          />
        </div>
      </Spin>
      <Modal
        title='Project Details'
        className='project-detail-modal'
        open={openProjectTab}
        onCancel={() => {
          setOpenProjectTab(false);
        }}
        footer={
          !isCreate && [
            <Popconfirm
              title='Delete Project'
              description='Are you sure to delete this Project?'
              okText='Yes'
              onConfirm={async () => {
                await deleteProject(selectedProject!.project_id!)
                  .unwrap()
                  .then(() => {
                    messageApi.success("Project deleted");
                    setOpenProjectTab(false);
                  })
                  .catch(() => {
                    messageApi.error("Failed to delete project");
                  });
              }}
              cancelText='No'
            >
              <Button type='primary' danger>
                Delete Project
              </Button>
            </Popconfirm>,
          ]
        }
      >
        <Tabs
          items={isCreate ? createProjectTab : tabsProps}
          className='project-tabs'
        />
      </Modal>
    </>
  );
};
