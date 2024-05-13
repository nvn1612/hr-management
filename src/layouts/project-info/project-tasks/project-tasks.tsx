import "./project-tasks.css";
import { useState } from "react";
import { TaskCard } from "src/components/task-card";
import { Radio, Modal, Button } from "antd";
import { TaskForm } from "src/layouts/task-form";
import { useGetUsersQuery } from "src/share/services";

export const ProjectTasks = () => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const taskFilterOptions = [
    { label: "All", value: "all" },
    { label: "Finished", value: "finished" },
    { label: "In Progress", value: "inProgress" },
  ];

  const { data } = useGetUsersQuery();

  return (
    <div className='task-section'>
      <div className='filter-role'>
        <p>Tasks</p>
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
        footer={[]}
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
          assignedStaffs={data}
        />
      </Modal>
    </div>
  );
};
