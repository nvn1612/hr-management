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
} from "src/share/services";

import type { User, Task } from "src/share/models";
import type { FormProps } from "antd";

interface TaskFormFields {
  taskName: string;
  description: string;
  start: string;
  deadline: string;
  status: boolean;
}

interface TaskFormProps {
  task?: Task;
  action: "create" | "update";
  assignedStaffs?: User[] | undefined;
}

export const TaskForm = ({ task, assignedStaffs, action }: TaskFormProps) => {
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [createAssignment] = useCreateAssigmentMutation();
  const [createTask] = useCreateTaskMutation();

  const documents = [
    { fileLink: "Link to document 1" },
    { fileLink: "Link to document 2" },
    { fileLink: "Link to document 3" },
  ];
  const activites = [
    { description: "Activity 1" },
    { description: "Activity 2" },
  ];

  const onEnterNewUser = () => {
    setShowAddUser(false);
  };
  const onFinish: FormProps<TaskFormFields>["onFinish"] = async (values) => {
    switch (action) {
      case "create":
        createTask({ description: values.description })
          .unwrap()
          .then((value) => {
            /* createAssignment(value.TaskProperty.) */
          })
          .then(() => {
            message.success("successful create task");
          })
          .catch(() => {
            message.error("Failed to create task");
          });
    }
  };

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        description: task.description,
        start: dayjs(task?.createdAt, "YYYY/MM/DD"),
        deadline: dayjs(Date(), "YYYY/MM/DD"),
      });
    }
  });
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
        <Form.Item<TaskFormFields> label='Start' name={"start"}>
          <DatePicker />
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
          {assignedStaffs?.map((staff) => (
            <Tag closable={true}>{staff.username}</Tag>
          ))}
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
                dataSource={documents}
                renderItem={(document) => (
                  <List.Item>
                    <List.Item.Meta description={document.fileLink} />
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
            dataSource={activites}
            renderItem={(activity) => (
              <List.Item>
                <List.Item.Meta description={activity.description} />
              </List.Item>
            )}
          />
          <Input placeholder='New activity' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary'>Save Changes</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
