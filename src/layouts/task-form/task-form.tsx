import "./task-form.css";
import "dayjs/locale/vi";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  Form,
  Button,
  Input,
  DatePicker,
  message,
  Typography,
  Spin,
  Select,
  Avatar,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import {
  EditOutlined,
  CalendarOutlined,
  DownOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useCreateAssigmentMutation,
  useUpdateTaskMutation,
  useGetDepartmentStaffsQuery,
  useUpdateAssignmentMutation,
  useGetUsersQuery,
} from "src/share/services";
import {
  type Task,
  type Assignment,
  type Project,
  OUserRole,
} from "src/share/models";
import { useRoleChecker } from "src/share/hooks";
import { TaskWorkspace } from "./task-workspace";

import type { FormProps } from "antd";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale("vi-VN");

interface TaskFormFields {
  description: string;
  start: string;
  deadline: string | Dayjs;
  status: boolean;
  assignedStaff: string;
}

interface TaskFormProps {
  assignment?: Assignment;
  task?: Task;
  action: "create" | "update";
  project: Project;
}

const { Title } = Typography;
export const TaskForm = ({
  assignment,
  action,
  project,
  task,
}: TaskFormProps) => {
  const checkRole = useRoleChecker();
  const [editDesc, setEditDesc] = useState<boolean>(false);

  const [form] = Form.useForm();
  const taskDesc = Form.useWatch("description", form);
  const taskDeadline = Form.useWatch("deadline", form);
  const taskAssginedUser = Form.useWatch("assignedStaff", form);

  const [createAssignment, { isLoading: creAssignLoad }] =
    useCreateAssigmentMutation();
  const [createTask, { isLoading: creTaskLoad }] = useCreateTaskMutation();
  const [updateTask, { isLoading: updTaskLoad }] = useUpdateTaskMutation();
  const [updateAssignment, { isLoading: updAssignLoad }] =
    useUpdateAssignmentMutation();
  const { data: departmentStaff } = useGetDepartmentStaffsQuery({
    itemsPerPage: "ALL",
    departmentId: project?.department_id,
  });
  const { data: users } = useGetUsersQuery({
    items_per_page: "ALL",
    page: 1,
    role: "STAFF",
  });

  const onFinish: FormProps<TaskFormFields>["onFinish"] = async (values) => {
    if (values.deadline) {
      values.deadline = (values.deadline as Dayjs).add(1, "day");
    }
    switch (action) {
      case "create": {
        const newTask = await createTask({
          description: values.description,
        }).unwrap();
        await createAssignment({
          ...{
            project_id: project?.project_id,
            task_property_id: newTask.task_property.task_property_id,
            user_property_id: values.assignedStaff,
          },
        })
          .unwrap()
          .then(() => {
            message.success("successful create task");
          })
          .catch((e) => message.error(e));

        break;
      }
      case "update": {
        try {
          await updateTask({
            taskId: task!.task_id,
            value: { description: values.description },
          }).unwrap();
          await updateAssignment({
            assigmentId: assignment!.assignment_id!,
            value: {
              endAt: values.deadline,
              status: values.status,
              user_property_id: values.assignedStaff,
            },
          });
          message.success("Task is updated");
        } catch {
          message.error("Failed to update task");
        }
      }
    }
  };

  useEffect(() => {
    if (task && assignment) {
      form.setFieldsValue({
        description: task.description,
        deadline: assignment.endAt
          ? dayjs((assignment.endAt as string).substring(0, 10), "YYYY/MM/DD")
          : undefined,
        assignedStaff: assignment.user_property_id || "",
        status: assignment?.status,
      });
    } else {
      form.setFieldsValue({
        description: "",
        assignedStaff: "",
      });
    }
  }, [assignment, project, task, action]);

  return (
    <div className='task-form-container'>
      <Spin
        spinning={creAssignLoad || creTaskLoad || updTaskLoad || updAssignLoad}
      >
        <Form
          form={form}
          name='task-form'
          onFinish={onFinish}
          className='task-form'
          disabled={checkRole(OUserRole.Staff)}
        >
          <div className='task-detail-content'>
            <div className='main-sec'>
              <div className='task-desc'>
                <Form.Item<TaskFormFields>
                  name='description'
                  className='task-desc-input'
                >
                  <Input
                    style={{
                      display: editDesc ? "block" : "none",
                    }}
                    onPressEnter={(e) => {
                      e.preventDefault();
                      setEditDesc(false);
                    }}
                  />
                </Form.Item>
                <Title
                  className='task-desc-displayer'
                  style={{
                    display: editDesc ? "none" : "flex",
                  }}
                  level={4}
                  onClick={() => {
                    if (!checkRole(OUserRole.Staff)) {
                      setEditDesc(true);
                    }
                  }}
                >
                  {taskDesc}
                  <EditOutlined style={{ fontSize: "15px" }} />
                </Title>
              </div>
              <TaskWorkspace task={task!} />
            </div>
            <div className='side-sec'>
              <div className='task-date-picker'>
                <Form.Item<TaskFormFields>
                  name={"deadline"}
                  className='task-update-date'
                >
                  <DatePicker
                    className='task-datepicker'
                    inputReadOnly
                    suffixIcon={""}
                    style={{
                      width: "250px",
                      height: "70px",
                    }}
                    size='large'
                    locale={locale}
                  />
                </Form.Item>
                <div
                  className='task-update-date-displayer'
                  style={{ width: "250px", height: "70px" }}
                >
                  <CalendarOutlined
                    style={{ fontSize: "20px", marginRight: "5px" }}
                  />
                  <span>
                    {taskDeadline
                      ? (taskDeadline as Dayjs).tz("Asia/Bangkok").toString()
                      : "Select deadline"}
                    <DownOutlined
                      style={{ fontSize: "15px", marginLeft: "5px" }}
                    />
                  </span>
                </div>
              </div>
              <div className='task-date-picker'>
                <Form.Item<TaskFormFields>
                  name={"deadline"}
                  className='task-update-date'
                >
                  <Select
                    style={{
                      width: "250px",
                      height: "70px",
                    }}
                    options={
                      assignment
                        ? departmentStaff?.users.map((staff) => {
                            return {
                              label: staff.username,
                              value: staff.user_id,
                            };
                          })
                        : users?.users.map((staff) => {
                            return {
                              label: staff.username,
                              value: staff.user_id,
                            };
                          })
                    }
                  />
                </Form.Item>
                <div
                  className='task-update-date-displayer'
                  style={{ width: "250px", height: "70px" }}
                >
                  <Avatar style={{ fontSize: "20px", marginRight: "5px" }} />
                  {(taskAssginedUser as string)
                    ? departmentStaff?.users.find(
                        (staff) => staff.user_id === taskAssginedUser
                      )?.username
                    : "Unassgined"}
                  <DownOutlined
                    style={{ fontSize: "15px", marginLeft: "5px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='task-update-form-btns'>
            <Button type='primary' htmlType='submit'>
              <SaveOutlined />
              Save
            </Button>
            <Button type='primary' htmlType='submit' danger>
              <DeleteOutlined />
              Delete
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};
