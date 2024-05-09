import "./projects.css";
import { useState } from "react";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import { Tabs, Modal, Button } from "antd";

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
      <Button onClick={() => setOpenProjectTab(true)}>Open Project Tabs</Button>
      <Modal
        title='Project Details'
        className='project-detail-modal'
        open={openProjectTab}
        onCancel={() => {
          setOpenProjectTab(false);
        }}
        onOk={() => {
          setOpenProjectTab(false);
        }}
      >
        <Tabs items={tabsProps} className='project-tabs' />
      </Modal>
    </>
  );
};
