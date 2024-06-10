import "./task-form.css";
import {
  Form,
  Button,
  Input,
  DatePicker,
  Checkbox,
  List,
  Upload,
  message,
  Typography,
  Spin,
  Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateTaskMutation,
  useCreateAssigmentMutation,
  useGetTaskActivityQuery,
  useCreateActivityMutation,
  useUpdateTaskMutation,
  useGetDepartmentStaffsQuery,
  useUpdateAssignmentMutation,
  useGetTaskFileMutation,
  useGetUsersQuery,
} from "src/share/services";

import {
  type Task,
  type Assignment,
  type Project,
  OUserRole,
} from "src/share/models";
import type { FormProps, UploadProps } from "antd";
import { localStorageUtil } from "src/share/utils";

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

const role = localStorageUtil.get("role")!;
const isStaff = role === OUserRole.Staff;

export const TaskForm = ({
  assignment,
  action,
  project,
  task,
}: TaskFormProps) => {
  const [form] = Form.useForm();

  const [createAssignment, { isLoading: creAssignLoad }] =
    useCreateAssigmentMutation();
  const [createTask, { isLoading: creTaskLoad }] = useCreateTaskMutation();
  const [createActivity, { isLoading: creActiLoad }] =
    useCreateActivityMutation();
  const [updateTask, { isLoading: updTaskLoad }] = useUpdateTaskMutation();
  const [updateAssignment, { isLoading: updAssignLoad }] =
    useUpdateAssignmentMutation();
  const { data: actitvityData, isFetching: actiFetch } =
    useGetTaskActivityQuery({
      taskPropertyId: task?.TaskProperty.task_property_id,
      items_per_page: "ALL",
    });
  const { data: departmentStaff } = useGetDepartmentStaffsQuery({
    itemsPerPage: "ALL",
    departmentId: project.ProjectProperty?.department_id,
  });
  const { data: users } = useGetUsersQuery({
    items_per_page: "ALL",
    page: 1,
    role: "STAFF",
  });
  const [getFile] = useGetTaskFileMutation();
  const [fileLinks, setFileLinks] = useState<string[]>([]);
  const { Text } = Typography;
  const baseApi = import.meta.env.VITE_REQUEST_API_URL;

  const uploadProps: UploadProps = {
    action: `${baseApi}tasks/upload-file-from-local/${task?.task_id}`,
    headers: {
      authorization: localStorageUtil.get("accessToken")!,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`file too large or bad internet`);
      }
    },
  };

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
            project_property_id: project.ProjectProperty?.project_property_id,
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

  const getLinks = () => {
    setFileLinks([]);
    return task?.document?.map((filename) =>
      getFile({ filename })
        .unwrap()
        .then((link) => {
          setFileLinks([...fileLinks, link]);
        })
    );
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
    if (task) {
      getLinks();
    }
  }, [assignment, project, task, actitvityData, action]);

  return (
    <div className='task-form-container'>
      <Spin
        spinning={
          creAssignLoad ||
          creTaskLoad ||
          creActiLoad ||
          updTaskLoad ||
          updAssignLoad ||
          actiFetch
        }
      >
        <Form
          form={form}
          name='task-form'
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          className='task-form'
        >
          <Form.Item<TaskFormFields> label='Description' name={"description"}>
            <Input.TextArea disabled={isStaff} />
          </Form.Item>
          {!isStaff && (
            <Form.Item name={"assignedStaff"} label='Assigned'>
              <Select
                options={
                  project.department_id
                    ? departmentStaff?.users.map((staff) => {
                        return {
                          label: <Text>{staff.username}</Text>,
                          value: staff.UserProperty?.user_property_id,
                        };
                      })
                    : users?.users.map((staff) => {
                        return {
                          label: <Text>{staff.username}</Text>,
                          value: staff.UserProperty?.user_property_id,
                        };
                      })
                }
              />
            </Form.Item>
          )}

          {action === "update" && (
            <>
              <Form.Item<TaskFormFields> label='Deadline' name={"deadline"}>
                <DatePicker disabled={isStaff} />
              </Form.Item>
              <Form.Item<TaskFormFields>
                label='Completed'
                name={"status"}
                valuePropName='checked'
              >
                <Checkbox disabled={isStaff} />
              </Form.Item>
            </>
          )}
          {!isStaff && (
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type='primary' htmlType='submit'>
                {action === "update" ? "Save Changes" : "Create"}
              </Button>
            </Form.Item>
          )}
          {action === "update" && (
            <>
              <Form.Item label='Documents'>
                <List
                  dataSource={
                    task !== undefined && task.document!.length >= 1
                      ? fileLinks
                      : []
                  }
                  renderItem={(link) => {
                    return (
                      <List.Item>
                        <a href={link}>{link}</a>
                      </List.Item>
                    );
                  }}
                />
                {!isStaff && (
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>
                      Upload new Document
                    </Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item label='Activities'>
                <List
                  dataSource={actitvityData ? actitvityData : []}
                  renderItem={(activity) => (
                    <List.Item>
                      <Text>{activity.description}</Text>
                    </List.Item>
                  )}
                />
                <Input
                  placeholder='New activity'
                  onPressEnter={async (e) => {
                    e.preventDefault();
                    createActivity({
                      description: (e.target as HTMLInputElement).value,
                      task_property_id: task?.TaskProperty.task_property_id,
                    })
                      .unwrap()
                      .then(() => message.success("New task is created"))
                      .catch(() => message.error("Failed to create task"));
                  }}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </div>
  );
};
