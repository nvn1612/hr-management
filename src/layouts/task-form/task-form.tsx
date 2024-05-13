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
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

import type { User } from "src/share/models";

interface TaskFormFields {
  taskName: string;
  description: string;
  start: string;
  deadline: string;
  status: boolean;
}

interface TaskFormProps {
  taskFields?: TaskFormFields;
  assignedStaffs?: User[] | undefined;
}

export const TaskForm = ({ taskFields, assignedStaffs }: TaskFormProps) => {
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [form] = Form.useForm();

  const reports = [
    { fileLink: "Link to report 1" },
    { fileLink: "Link to report 2" },
    { fileLink: "Link to report 3" },
  ];
  const activites = [
    { description: "Activity 1" },
    { description: "Activity 2" },
  ];

  const onEnterNewUser = () => {
    setShowAddUser(false);
  };
  const onFinish = () => {};

  useEffect(() => {
    if (taskFields) {
      form.setFieldsValue({
        ...taskFields,
        start: dayjs(taskFields?.start, "YYYY/MM/DD"),
        deadline: dayjs(taskFields?.deadline, "YYYY/MM/DD"),
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
        <Form.Item<TaskFormFields> label='Task' name={"taskName"}>
          <Input />
        </Form.Item>
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
        <Form.Item label='Reports'>
          <List
            dataSource={reports}
            renderItem={(report) => (
              <List.Item>
                <List.Item.Meta description={report.fileLink} />
              </List.Item>
            )}
          />
          <Upload>
            <Button icon={<UploadOutlined />}>Upload new report</Button>
          </Upload>
        </Form.Item>
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
