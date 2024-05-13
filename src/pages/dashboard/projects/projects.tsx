import "./projects.css";
import { useState } from "react";
import { Tabs, Modal, Popconfirm, Button } from "antd";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import { ProjectCard } from "src/components/project-card";

import type { TabsProps } from "antd";

export const Projects = () => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "Project Information",
      children: <ProjectInfo />,
    },
    {
      key: "2",
      label: "Project Reports",
      children: <ProjectReports />,
    },
  ];

  return (
    <>
      <ProjectCard onClick={() => setOpenProjectTab(true)} />
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
