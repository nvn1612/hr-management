import { Form, Input, Button } from "antd";

import type { Project } from "src/share/models";

interface ProjectReportFields {
  reports: string;
  project: Project;
}

export const ProjectReportForm = ({ project }) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      className='project-report-form'
    >
      <Form.Item<ProjectReportFields> label='Report' name={"reports"}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary'>Submit report</Button>
      </Form.Item>
    </Form>
  );
};
