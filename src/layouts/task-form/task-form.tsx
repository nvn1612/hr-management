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
  useGetTaskByPropertiesMutation,
  useGetUsersByPropertiesMutation,
  useGetTaskActivityQuery,
} from "src/share/services";

import type { User, Task, Assignment } from "src/share/models";
import type { FormProps } from "antd";

interface TaskFormFields {
  taskName: string;
  description: string;
  start: string;
  deadline: string;
  status: boolean;
}

interface TaskFormProps {
  assignment?: Assignment;
  action: "create" | "update";
  assignedStaffs?: User[] | undefined;
  projectPropertyId: string;
  refetch: () => void;
}

export const TaskForm = ({
  assignment,
  action,
  projectPropertyId,
  refetch,
}: TaskFormProps) => {
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [assignedStaff, setAssignedStaff] = useState<User | undefined>(
    undefined
  );
  const [form] = Form.useForm();

  const [createAssignment] = useCreateAssigmentMutation();
  const [createTask] = useCreateTaskMutation();
  const [getTaskByProperties] = useGetTaskByPropertiesMutation();
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
    await getTaskByProperties({
      values: { task_property_ids: [assignment?.project_property_id || ""] },
    })
      .unwrap()
      .then((value) => {
        // pass only 1 id - result as 1 item array
        setTask(value.data[0]);
      })
      .catch(() => {
        setTask(undefined);
      });
    if (task) {
      form.setFieldsValue({
        description: task.description,
        deadline: dayjs(Date(), "YYYY/MM/DD"),
      });
    }
  };

  const fetchStaff = async () => {
    await getStaff({
      values: { user_property_ids: [assignment?.user_property_id || ""] },
    })
      .unwrap()
      .then((value) => {
        // same as above
        setAssignedStaff(value.users[0]);
      });
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
          {assignedStaff && <Tag closable={true}>{assignedStaff.username}</Tag>}
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
        {action === "update" && (
          <>
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
          </>
        )}
        <Form.Item label='Activities'>
          <List
            dataSource={actitvityData || []}
            renderItem={(activity) => (
              <List.Item>
                <List.Item.Meta description={activity.description} />
              </List.Item>
            )}
          />
          <Input placeholder='New activity' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary' htmlType='submit'>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
