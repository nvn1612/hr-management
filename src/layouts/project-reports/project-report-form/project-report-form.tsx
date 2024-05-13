import { Form, Input, Button } from "antd";

interface ProjectReportFields {
  reports: string;
}

export const ProjectReportForm = () => {
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
