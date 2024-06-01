import "./project-tasks.css";
import { useEffect, useState } from "react";
import { TaskCard } from "src/components/task-card";
import { Radio, Modal, Button, Popconfirm, List } from "antd";
import { TaskForm } from "src/layouts/task-form";
import {
  useGetTaskByPropertiesMutation,
  useGetTaskPropertiesQuery,
} from "src/share/services";

import { Task } from "src/share/models";

interface ProjectTasksProp {
  projectId?: string;
}

export const ProjectTasks = ({ projectId }: ProjectTasksProp) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [taskList, setTaskList] = useState<Task[]>();
  const [page, setPage] = useState<number>(1);
  const [formAction, setFormAction] = useState<"create" | "update">("create");

  const taskFilterOptions = [
    { label: "All", value: "all" },
    { label: "Finished", value: "finished" },
    { label: "In Progress", value: "inProgress" },
  ];

  const { data } = useGetTaskPropertiesQuery({ projectId });
  const [getTaskByProperties] = useGetTaskByPropertiesMutation();

  const fetchTask = async () => {
    await getTaskByProperties({
      values: { task_property_ids: data || [] },
      params: {
        page,
      },
    })
      .unwrap()
      .then((values) => {
        setTaskList(values.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchTask();
  }, [projectId, page]);

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
        <List
          pagination={{
            onChange: (selectedPage) => {
              setPage(selectedPage);
            },
          }}
          dataSource={taskList}
          renderItem={(task) => {
            return (
              <TaskCard
                onClick={() => {
                  setShowTaskForm(true);
                  setSelectedTask(task);
                  setFormAction("update");
                }}
              />
            );
          }}
        />
        <Button
          type='primary'
          onClick={() => {
            setShowTaskForm(true);
            setFormAction("create");
          }}
        >
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
          projectId={projectId!}
          task={selectedTask!}
          action={formAction}
        />
      </Modal>
    </div>
  );
};
