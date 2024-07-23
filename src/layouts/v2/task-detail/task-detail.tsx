import "./task-detail.css";
import { Modal, Select, Typography, Input, Button } from "antd";
import { useState } from "react";
import { UserPlus, MenuDots } from "src/assets/icons";
import { DocumentSection, CustomAvatar } from "src/components/v2";

import type { Assignment, Task, Project } from "src/share/models";

interface TaskFormProps {
  assignment?: Assignment;
  task?: Task;
  action: "create" | "update";
  project: Project;
  setShowTaskForm: (isOpen: boolean) => void;
}

export const TaskDetail = ({ assignment, task }: TaskFormProps) => {
  const [actiDesc, setActiDesc] = useState<string>("");

  return (
    <Modal
      width={1000}
      open={true}
      title={
        <div className='task-detail-modal-title'>
          <Select
            className='task-assignment-selector'
            defaultValue={assignment ? assignment.user_id : ""}
            options={[]}
          />
          <div className='assign-task-btn'>
            <UserPlus className='user-plus-assign-task' />
            <Typography.Title level={5}>Assign task to</Typography.Title>
          </div>
          <MenuDots className='menu-dots-task-detail' />
        </div>
      }
      footer={[]}
    >
      <div className='task-detail-content'>
        <div className='main-task-detail-section'>
          <div className='acti-section'>
            <div className='acti-des-row'>
              <CustomAvatar size={25} userName='Nguyen Van A' />
              <div className='acti-des-container'>
                <Input.TextArea
                  style={{ resize: "none", height: "100px" }}
                  className='task-text-area'
                  placeholder='New activity'
                  value={actiDesc}
                  onChange={(e) => {
                    setActiDesc(e.target.value);
                  }}
                />
                <Button type='primary' className='add-acti-btn'>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DocumentSection />
      </div>
    </Modal>
  );
};
