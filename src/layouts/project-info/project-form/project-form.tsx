import { Form, Input, InputNumber, Button } from "antd";

interface ProjectFormFields {
  projectName: string;
  investor: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  manager: string;
  revenue: number;
  status: string;
}

export const ProjectForm = () => {
  const [form] = Form.useForm();
  const onFinish = () => {};

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item<ProjectFormFields> name={"projectName"} label='Project name'>
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields> name={"investor"} label='Investor'>
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields> name={"manager"} label='Manager'>
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields> name={"clientName"} label="Client's name">
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields> name={"clientPhone"} label="Client's phone">
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields>
        name={"clientAddress"}
        label="Client's address"
      >
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields> name={"status"} label='Status'>
        <Input />
      </Form.Item>
      <Form.Item<ProjectFormFields> name={"revenue"} label='Revenue'>
        <InputNumber addonAfter='VND' changeOnWheel />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary'>Save Changes</Button>
      </Form.Item>
    </Form>
  );
};
