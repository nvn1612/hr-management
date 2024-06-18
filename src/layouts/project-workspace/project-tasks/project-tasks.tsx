import "./project-tasks.css";
import { useState } from "react";
import { Modal, Button, List, Spin } from "antd";
import { TaskForm } from "src/layouts";
import {
  useGetProjectTasksQuery,
  useGetAssignmentsQuery,
} from "src/share/services";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { Assignment, OUserRole, Project, Task } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

interface ProjectTasksProp {
  project: Project;
}

const role = localStorageUtil.get("role");

export const ProjectTasks = ({ project }: ProjectTasksProp) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [formAction, setFormAction] = useState<"create" | "update">("create");
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedAssignment, setSelectedAssignment] = useState<
    Assignment | undefined
  >(undefined);

  const { data: taskList, isFetching: taskFetch } = useGetProjectTasksQuery({
    projectId: project?.project_id,
    page,
    items_per_page: 5,
  });
  const { data: assigments, isFetching: assignmentFetch } =
    useGetAssignmentsQuery({
      targetId: project!.project_id!,
      items_per_page: "ALL",
      target: "project",
    });

  return (
    <div className='task-section'>
      <div className='filter-role'>
        <p className='project-section-title'>Tasks</p>
      </div>
      <div className='task-card-container'>
        <Spin spinning={assignmentFetch || taskFetch} tip='Getting Tasks'>
          <List
            pagination={{
              onChange: (selectedPage) => {
                setPage(selectedPage);
              },
              total: taskList?.total,
              pageSize: 5,
              showSizeChanger: false,
            }}
            dataSource={taskList?.data}
            renderItem={(task) => {
              let matchedAssignment: Assignment | undefined;
              if (task.task_id) {
                matchedAssignment = assigments?.assignments?.find(
                  (assignment) => task.task_id === assignment.task_id
                );
                return (
                  <List.Item
                    actions={[
                      <Button
                        type='link'
                        onClick={() => {
                          setShowTaskForm(true);
                          setFormAction("update");
                          setSelectedTask(task);
                          setSelectedAssignment(matchedAssignment);
                        }}
                      >
                        View detail
                      </Button>,
                      matchedAssignment?.status ? (
                        <CheckCircleOutlined className='task-done-icon' />
                      ) : (
                        <ClockCircleOutlined className='task-in-progress-icon' />
                      ),
                    ]}
                  >
                    <List.Item.Meta title={task?.description} />
                  </List.Item>
                );
              }
            }}
          />
        </Spin>
        {!(role === OUserRole.Staff) && (
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
        )}
      </div>
      <Modal
        title={
          <Button type='primary' onClick={() => {}}>
            Complete
          </Button>
        }
        open={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        onOk={() => setShowTaskForm(false)}
        footer={[]}
        className='task-modal'
      >
        <TaskForm
          project={project}
          action={formAction}
          assignment={selectedAssignment}
          task={selectedTask}
        />
      </Modal>
    </div>
  );
};
