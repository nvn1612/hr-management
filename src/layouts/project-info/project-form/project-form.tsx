import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  message,
  Select,
  Typography,
  Spin,
} from "antd";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetDepartmentsQuery,
  useGetUserDetailQuery,
  useGetUsersQuery,
} from "src/share/services";
import dayjs, { Dayjs } from "dayjs";

import { OUserRole, type Project } from "src/share/models";
import type { FormProps } from "antd";

interface ProjectFormProps {
  project?: Project;
  departFetch?: boolean;
  allFetch?: boolean;
}

export const ProjectForm = ({
  project,
  departFetch,
  allFetch,
}: ProjectFormProps) => {
  const [form] = Form.useForm();
  const [editableForm, setEditableForm] = useState<boolean>(false);
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const { data: pms } = useGetUsersQuery({
    role: "PROJECT_MANAGER",
    items_per_page: "ALL",
  });
  const { data: departmentData } = useGetDepartmentsQuery({
    itemsPerPage: "ALL",
  });
  const { data: userDetail } = useGetUserDetailQuery();

  const [messageApi, contextHolder] = message.useMessage();
  const { Text } = Typography;

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    if (values.endAt) {
      values.endAt = (values.endAt as Dayjs).add(1, "day");
    }
    if (values.startAt) {
      values.startAt = (values.startAt as Dayjs).add(1, "day");
    }
    if (userDetail?.UserProperty?.role?.name === OUserRole.Manager) {
      values.department_id = userDetail.UserProperty.department_id;
    }
    if (!project) {
      await createProject(values)
        .unwrap()
        .then(() => messageApi.success("Success create project"))
        .catch(() => messageApi.error("There was an error"));
    } else if (project) {
      await updateProject({ values, projectId: project.project_id })
        .unwrap()
        .then(() => {
          messageApi.success("Success update project");
        })
        .catch(() => messageApi.error("There was an error"));
    }
  };

  const newProject: Project = {
    startAt: dayjs(),
    endAt: dayjs(),
    projectCode: "",
    description: "",
    investor: "",
    name: "",
    department_id: undefined,
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
            department_id: project.ProjectProperty?.department_id,
          }
        : { ...newProject }
    );
  });

  return (
    <>
      {contextHolder}
      <Spin
        spinning={departFetch || allFetch}
        size='large'
        tip='Take your time'
      >
        {project &&
          userDetail?.UserProperty?.role?.name !== OUserRole.Staff && (
            <Checkbox
              checked={editableForm}
              onChange={() => setEditableForm(!editableForm)}
            >
              Edit information
            </Checkbox>
          )}
        <Form
          form={form}
          disabled={project ? !editableForm : false}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item<Project> name={"name"} label='Project name'>
            <Input />
          </Form.Item>
          <Form.Item<Project> name={"projectCode"} label='Project Code'>
            <Input />
          </Form.Item>
          <Form.Item<Project> name={"investor"} label='Investor'>
            <Input />
          </Form.Item>
          <Form.Item<Project> name={"description"} label='Description'>
            <Input.TextArea />
          </Form.Item>
          {userDetail?.UserProperty?.role?.name === OUserRole.Admin && (
            <>
              <Form.Item<Project> name={"department_id"} label='Department'>
                <Select
                  options={departmentData?.departments?.map((department) => {
                    return {
                      label: <Text>{department.name}</Text>,
                      value: department.department_id,
                    };
                  })}
                />
              </Form.Item>
              <Form.Item<Project>
                name={"project_manager_id"}
                label='Project Manager'
              >
                <Select
                  options={pms?.users?.map((pm) => {
                    return {
                      label: <Text>{pm.name}</Text>,
                      value: pm.user_id,
                    };
                  })}
                />
              </Form.Item>
            </>
          )}
          {project && (
            <>
              <Form.Item<Project> name={"startAt"} label='Start'>
                <DatePicker />
              </Form.Item>
            </>
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
      </Spin>
    </>
  );
};
