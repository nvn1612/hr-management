import "./project-tasks.css";
import { useEffect, useState } from "react";
import { TaskCard } from "src/components/task-card";
import { Radio, Modal, Button, Popconfirm, List } from "antd";
import { TaskForm } from "src/layouts/task-form";
import {
  useGetTaskByPropertiesMutation,
  useGetTaskPropertiesQuery,
  useGetProjectAssignmentsQuery,
} from "src/share/services";

import { Assignment, Task } from "src/share/models";

interface ProjectTasksProp {
  projectPropertyId?: string;
}

export const ProjectTasks = ({ projectPropertyId }: ProjectTasksProp) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [selectedAssigment, setSelectedAssigment] = useState<
    Assignment | undefined
  >();
  const [taskList, setTaskList] = useState<Task[]>();
  const [page, setPage] = useState<number>(1);
  const [formAction, setFormAction] = useState<"create" | "update">("create");

  const taskFilterOptions = [
    { label: "All", value: "all" },
    { label: "Finished", value: "finished" },
    { label: "In Progress", value: "inProgress" },
  ];

  const { data } = useGetTaskPropertiesQuery({ projectPropertyId });
  const projectAssignments = useGetProjectAssignmentsQuery({
    projectPropertyId,
    itemsPerPage: 7,
  });
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
  }, [projectPropertyId, page]);

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
          dataSource={projectAssignments.data?.assignments}
          renderItem={(assignment) => {
            if (assignment.task_information) {
              const matchedTask = taskList?.find(
                (task) =>
                  task.TaskProperty.task_property_id ===
                  assignment.task_property_id
              );
              return (
                <List.Item>
                  <List.Item.Meta title={matchedTask?.description} />
                </List.Item>
              );
            }
          }}
        />
        <Button
          className='create-task-btn'
          type='primary'
          onClick={() => {
            setShowTaskForm(true);
            setFormAction("create");
          }}
        >
          Create new Task
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
          projectPropertyId={projectPropertyId!}
          action={formAction}
          refetch={fetchTask}
        />
      </Modal>
    </div>
  );
};
