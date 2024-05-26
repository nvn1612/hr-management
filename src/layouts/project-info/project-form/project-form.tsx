import { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, DatePicker, message } from "antd";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
} from "src/share/services";
import dayjs from "dayjs";

import type { Project } from "src/share/models";
import type { FormProps } from "antd";

interface ProjectFormProps {
  project?: Project;
}

export const ProjectForm = ({ project }: ProjectFormProps) => {
  const [form] = Form.useForm();
  const [editableForm, setEditableForm] = useState<boolean>(false);
  const [createProject] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    if (!project) {
      await createProject(values)
        .unwrap()
        .then(() => messageApi.success("sucess create project"))
        .catch((e) => messageApi.error(e));
    } else if (project) {
      await deleteProject(project.project_id!).unwrap();
      // .then(() => messageApi.success("updated"))
      // .catch((e) => messageApi.error(e));
    }
  };

  const newProject: Project = {
    startAt: dayjs(),
    endAt: dayjs(),
  };

  useEffect(() => {
    form.setFieldsValue(
      project
        ? {
            ...project,
            startAt: dayjs(
              typeof project.startAt === "string"
                ? project.startAt.substring(0, 10)
                : new Date()
            ),
            endAt: dayjs(
              typeof project.endAt === "string"
                ? project.endAt.substring(0, 10)
                : new Date()
            ),
          }
        : newProject
    );
  });

  return (
    <>
      {contextHolder}
      <Checkbox
        checked={editableForm}
        onChange={() => setEditableForm(!editableForm)}
      >
        Edit information
      </Checkbox>
      <Form
        form={form}
        disabled={!editableForm}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item<Project> name={"name"} label='Project name'>
          <Input />
        </Form.Item>
        <Form.Item<Project> name={"investor"} label='Investor'>
          <Input />
        </Form.Item>
        <Form.Item<Project> name={"description"} label='Description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item<Project> name={"createdBy"} label='Created By'>
          <Input />
        </Form.Item>
        <Form.Item<Project> name={"modifiedBy"} label='Updated By'>
          <Input />
        </Form.Item>
        {project && (
          <Form.Item<Project> name={"startAt"} label='Start'>
            <DatePicker />
          </Form.Item>
        )}
        <Form.Item<Project> name={"endAt"} label='End'>
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary' htmlType='submit'>
            {project ? "Save Changes" : "Create project"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
