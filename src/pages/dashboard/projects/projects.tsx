import "./projects.css";
import { useState } from "react";
import { Tabs, Modal, Popconfirm, Button, List } from "antd";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import { ProjectWorkspace } from "src/layouts/project-workspace";
import { ProjectCard } from "src/components/project-card";
import { MngPageHeader } from "src/layouts/mng-page-header";
import { useGetAllProjectQuery } from "src/share/services";

import type { TabsProps, PaginationProps } from "antd";
import type { Project } from "src/share/models";

export const Projects = () => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [queries, setQueries] = useState<{
    page: number | undefined;
  }>({ page: 1 });
  const { data } = useGetAllProjectQuery({ page: 1 });

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: <ProjectInfo />,
    },
    {
      key: "2",
      label: "Workspace",
      children: <ProjectWorkspace />,
    },
    {
      key: "3",
      label: "Reports",
      children: <ProjectReports />,
    },
  ];
  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  return (
    <>
      <MngPageHeader
        title='Projects'
        addBtnContent='Create Project'
        itemCount={data?.total}
      />
      <ProjectCard onClick={() => setOpenProjectTab(true)} />
      <div className='user-card-container'>
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
                        }}
                        project={selectedProject}
                      />
                    </List.Item>
                  );
                }
              : undefined
          }
        />
      </div>
      <Modal
        title='Project Details'
        className='project-detail-modal'
        open={openProjectTab}
        onCancel={() => {
          setOpenProjectTab(false);
        }}
        footer={[
          <Popconfirm
            title='Delete Project'
            description='Are you sure to delete this Project?'
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Delete Project
            </Button>
          </Popconfirm>,
        ]}
      >
        <Tabs items={tabsProps} className='project-tabs' />
      </Modal>
    </>
  );
};
