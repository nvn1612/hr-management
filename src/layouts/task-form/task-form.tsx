import "./task-form.css";
import {
  Form,
  Button,
  Input,
  DatePicker,
  Tag,
  Checkbox,
  List,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateTaskMutation,
  useCreateAssigmentMutation,
  useGetUsersByPropertiesMutation,
  useGetTaskActivityQuery,
} from "src/share/services";

import type { User, Task, Assignment } from "src/share/models";
import type { FormProps } from "antd";

interface TaskFormFields {
  description: string;
  start: string;
  deadline: string;
  status: boolean;
}

interface TaskFormProps {
  assignment?: Assignment;
  task?: Task;
  action: "create" | "update";
  projectPropertyId: string;
  refetch: () => void;
}

export const TaskForm = ({
  assignment,
  action,
  projectPropertyId,
  refetch,
  task,
}: TaskFormProps) => {
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [assignedStaff, setAssignedStaff] = useState<User | undefined>(
    undefined
  );
  const [form] = Form.useForm();

  const [createAssignment] = useCreateAssigmentMutation();
  const [createTask] = useCreateTaskMutation();
  const { data: actitvityData } = useGetTaskActivityQuery({
    taskId: task?.task_id,
  });
  const [getStaff] = useGetUsersByPropertiesMutation();

  const documents: string[] = [];

  const onEnterNewUser = () => {
    setShowAddUser(false);
  };
  const onFinish: FormProps<TaskFormFields>["onFinish"] = async (values) => {
    switch (action) {
      case "create": {
        const newTask = await createTask({
          description: values.description,
        }).unwrap();
        await createAssignment({
          project_property_id: projectPropertyId,
          task_property_id: newTask.task_property.task_property_id,
        })
          .unwrap()
          .then(() => {
            message.success("successful create task");
            refetch && refetch();
          })
          .catch((e) => message.error(e));

        break;
      }
      case "update":
    }
  };

  const fetchTask = async () => {
    if (task && assignment) {
      form.setFieldsValue({
        description: task.description,
        deadline: assignment.endAt
          ? dayjs(assignment.endAt.substring(0, 9), "YYYY/MM/DD")
          : dayjs(),
        status: assignment?.status,
      });
    } else {
      form.setFieldsValue({
        description: "",
      });
    }
  };

  const fetchStaff = async () => {
    if (assignment?.user_property_id) {
      await getStaff({
        values: { user_property_ids: [assignment.user_property_id || ""] },
      })
        .unwrap()
        .then((value) => {
          // same as above
          if (value.users.length > 0) {
            setAssignedStaff(value.users[0]);
          } else {
            setAssignedStaff(undefined);
          }
        });
    }
  };

  useEffect(() => {
    fetchTask();
    fetchStaff();
  }, [assignment, projectPropertyId]);
  return (
    <div className='task-form-container'>
      <Form
        form={form}
        name='task-form'
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        className='task-form'
      >
        <Form.Item<TaskFormFields> label='Description' name={"description"}>
          <Input.TextArea />
        </Form.Item>
        {action === "update" && (
          <>
            <Form.Item<TaskFormFields> label='Deadline' name={"deadline"}>
              <DatePicker />
            </Form.Item>
            <Form.Item<TaskFormFields>
              label='Status'
              name={"status"}
              valuePropName='checked'
            >
              <Checkbox />
            </Form.Item>
            <Form.Item label='Assigned'>
              {assignedStaff && (
                <Tag closable={true}>{assignedStaff.username}</Tag>
              )}
              {showAddUser ? (
                <Input size='small' onPressEnter={onEnterNewUser} />
              ) : (
                <Tag
                  className='add-user-tag'
                  onClick={() => {
                    setShowAddUser(true);
                  }}
                >
                  New Staff
                </Tag>
              )}
            </Form.Item>
            <Form.Item label='Documents'>
              <List
                dataSource={documents || []}
                renderItem={(document) => (
                  <List.Item>
                    <List.Item.Meta description={document} />
                  </List.Item>
                )}
              />
              <Upload>
                <Button icon={<UploadOutlined />}>Upload new Document</Button>
              </Upload>
            </Form.Item>
            <Form.Item label='Activities'>
              <List
                dataSource={
                  actitvityData && actitvityData.length > 0 ? actitvityData : []
                }
                renderItem={(activity) => (
                  <List.Item>
                    <List.Item.Meta description={activity.description} />
                  </List.Item>
                )}
              />
              <Input placeholder='New activity' />
            </Form.Item>
          </>
        )}
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary' htmlType='submit'>
            {action === "update" ? "Save Changes" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
