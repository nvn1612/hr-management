import "./projects.css";
import { useEffect, useState } from "react";
import { Tabs, Modal, Popconfirm, Button, List, message, Spin } from "antd";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import { ProjectWorkspace } from "src/layouts/project-workspace";
import { ProjectCard } from "src/components/project-card";
import { MngPageHeader } from "src/layouts/mng-page-header";
import {
  useGetAllProjectQuery,
  useDeleteProjectMutation,
  useGetUserDetailQuery,
  useGetAllProjectDepartmentQuery,
} from "src/share/services";

import type { TabsProps, PaginationProps } from "antd";
import { OUserRole, type Project } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

const role = localStorageUtil.get("role");
export const Projects = () => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [queries, setQueries] = useState<{
    page: number;
  }>({ page: 1 });
  const [messageApi, contextHolder] = message.useMessage();

  const { data: allProject, isFetching } = useGetAllProjectQuery(
    { ...queries },
    { skip: role !== OUserRole.Admin }
  );
  const { data: userDetail } = useGetUserDetailQuery();
  const { data: departmentProject, isFetching: departProjectFetch } =
    useGetAllProjectDepartmentQuery({
      departmentId: userDetail?.UserProperty?.department_id,
    });
  const [deleteProject] = useDeleteProjectMutation();

  const subRefetch = () => {
    setSelectedProject((oldState) => {
      if (role === OUserRole.Admin) {
        return allProject?.data.find(
          (newState) => newState.project_id === oldState?.project_id
        );
      }
      return departmentProject?.data.find(
        (newState) => newState.project_id === oldState?.project_id
      );
    });
  };

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <ProjectInfo
          project={selectedProject}
          departFetch={departProjectFetch}
          allFetch={isFetching}
        />
      ),
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

  const createProjectTab: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <ProjectInfo
          project={undefined}
          departFetch={departProjectFetch}
          allFetch={isFetching}
        />
      ),
    },
  ];

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  useEffect(() => {
    subRefetch();
  }, [departmentProject, allProject]);

  return (
    <>
      {contextHolder}
      <Spin
        spinning={isFetching || departProjectFetch}
        tip='Loading Projects'
        className='project-card-loading'
        size='large'
      >
        <MngPageHeader
          title='Projects'
          addBtnContent='Create Project'
          itemCount={
            role === OUserRole.Admin
              ? allProject?.total
              : departmentProject?.total
          }
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
              total:
                role === OUserRole.Admin
                  ? allProject?.total
                  : departmentProject?.total,
              onChange: onChangePage,
            }}
            dataSource={
              role === OUserRole.Admin
                ? allProject?.data
                : departmentProject?.data
            }
            renderItem={
              allProject?.data || departmentProject?.data
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
        title={isCreate ? "Create Project" : "Project Details"}
        className='project-detail-modal'
        open={openProjectTab}
        onCancel={() => {
          setOpenProjectTab(false);
        }}
        footer={
          !(role === OUserRole.Staff) && !isCreate
            ? [
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
            : []
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
