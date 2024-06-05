import "./project-tasks.css";
import { useEffect, useState } from "react";
import { Modal, Button, Popconfirm, List, Spin } from "antd";
import { TaskForm } from "src/layouts";
import {
  useGetTaskByPropertiesMutation,
  useGetTaskPropertiesQuery,
  useGetProjectAssignmentsQuery,
} from "src/share/services";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { Assignment, Project, Task } from "src/share/models";

interface ProjectTasksProp {
  project: Project;
}

export const ProjectTasks = ({ project }: ProjectTasksProp) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const [taskList, setTaskList] = useState<Task[]>();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedAssignment, setSelectedAssignment] = useState<
    Assignment | undefined
  >(undefined);
  const [page, setPage] = useState<number>(1);
  const [formAction, setFormAction] = useState<"create" | "update">("create");

  const { data } = useGetTaskPropertiesQuery({
    projectPropertyId: project.ProjectProperty?.project_property_id,
  });
  const projectAssignments = useGetProjectAssignmentsQuery({
    projectPropertyId: project.ProjectProperty?.project_property_id,
    itemsPerPage: 5,
  });
  const [getTaskByProperties, { isLoading: taskLoading }] =
    useGetTaskByPropertiesMutation();

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
  }, [project, page, projectAssignments]);

  return (
    <div className='task-section'>
      <div className='filter-role'>
        <p className='project-section-title'>Tasks</p>
      </div>
      <div className='task-card-container'>
        <Spin
          spinning={projectAssignments.isFetching || taskLoading}
          tip='Getting Tasks'
        >
          <List
            pagination={{
              onChange: (selectedPage) => {
                setPage(selectedPage);
              },
            }}
            dataSource={projectAssignments.data?.assignments}
            renderItem={(assignment) => {
              if (assignment.task_property_id) {
                const matchedTask = taskList?.find(
                  (task) =>
                    task.TaskProperty.task_property_id ===
                    assignment.task_property_id
                );
                return (
                  <List.Item
                    actions={[
                      <Button
                        type='link'
                        onClick={() => {
                          setShowTaskForm(true);
                          setFormAction("update");
                          setSelectedTask(matchedTask);
                          setSelectedAssignment(assignment);
                        }}
                      >
                        View detail
                      </Button>,
                      assignment.status ? (
                        <CheckCircleOutlined className='task-done-icon' />
                      ) : (
                        <ClockCircleOutlined className='task-in-progress-icon' />
                      ),
                    ]}
                  >
                    <List.Item.Meta title={matchedTask?.description} />
                  </List.Item>
                );
              }
            }}
          />
        </Spin>
        <Button
          className='create-task-btn'
          type='default'
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
          formAction === "update" && (
            <Popconfirm
              title='Delete Task'
              description='Are you sure to delete this task ?'
              okText='Yes'
              cancelText='No'
            >
              <Button type='primary' danger>
                Delete task
              </Button>
            </Popconfirm>
          ),
        ]}
        className='task-modal'
      >
        <TaskForm
          project={project}
          action={formAction}
          refetch={fetchTask}
          assignment={selectedAssignment}
          task={selectedTask}
        />
      </Modal>
    </div>
  );
};
