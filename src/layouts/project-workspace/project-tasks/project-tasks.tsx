import "./project-tasks.css";
import { useState } from "react";
import { TaskCard } from "src/components/task-card";
import { Radio, Modal, Button, Popconfirm } from "antd";
import { TaskForm } from "src/layouts/task-form";
import { useGetUsersQuery } from "src/share/services";
import { OUserRole } from "src/share/models";

export const ProjectTasks = () => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const taskFilterOptions = [
    { label: "All", value: "all" },
    { label: "Finished", value: "finished" },
    { label: "In Progress", value: "inProgress" },
  ];

  const { data } = useGetUsersQuery({ role: OUserRole.All });

  return (
    <div className='task-section'>
      <div className='filter-role'>
        <p className='project-section-title'>Tasks</p>
        <Radio.Group
          defaultValue='all'
          options={taskFilterOptions}
          optionType='button'
        />
      </div>
      <div className='task-card-container'>
        <TaskCard onClick={() => setShowTaskForm(true)} />
        <TaskCard onClick={() => setShowTaskForm(true)} />
        <TaskCard onClick={() => setShowTaskForm(true)} />
        <Button type='primary' onClick={() => setShowTaskForm(true)}>
          Add new Task
        </Button>
      </div>
      <Modal
        title='Task Details'
        open={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        onOk={() => setShowTaskForm(false)}
        footer={[
          <Popconfirm
            title='Delete Project'
            description='Are you sure to delete this task ?'
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Delete task
            </Button>
          </Popconfirm>,
        ]}
        className='task-modal'
      >
        <TaskForm
          taskFields={{
            deadline: "2024/12/12",
            start: "2024/11/11",
            taskName: "Fix Task Form UI ",
            description: "nothing yet",
            status: true,
          }}
          assignedStaffs={data?.users}
        />
      </Modal>
    </div>
  );
};
