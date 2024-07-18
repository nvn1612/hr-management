import "./task-detail.css";
import { Modal, Select } from "antd";

import type { Assignment, Task, Project } from "src/share/models";

interface TaskFormProps {
  assignment?: Assignment;
  task?: Task;
  action: "create" | "update";
  project: Project;
  setShowTaskForm: (isOpen: boolean) => void;
}

export const TaskDetail = ({ assignment, task }: TaskFormProps) => {
  return (
    <Modal
      title={
        <div className='task-detail-modal-title'>
          <Select
            defaultValue={assignment ? assignment.user_id : ""}
            options={[]}
          ></Select>
        </div>
      }
    ></Modal>
  );
};
