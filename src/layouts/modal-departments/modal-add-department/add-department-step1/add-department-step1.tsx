import React from 'react'
import {
  Input,
  Form,
  message,
  Button
} from "antd";
import { useAddDepartmentMutation } from "src/share/services";
import type { FormProps } from "antd";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
export interface AddDepartmentForm {
  name: string;
  description: string;
}
export const AddDepartmentStep1= () => {
  const [addDepartment] = useAddDepartmentMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish: FormProps<AddDepartmentForm>["onFinish"] = async (values) => {
    await addDepartment(values)
      .unwrap()
      .then(() => messageApi.success("New dapartment was added"))
      .catch(() => messageApi.error("something went wrong"));
  };
  return (
    <>  {contextHolder}
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          variant="filled"
          style={{ maxWidth: 600 }}
        >
          <Form.Item<AddDepartmentForm>
            label="Name Department"
            name="name"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AddDepartmentForm>
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Department
            </Button>
          </Form.Item>
        </Form>
    </>
  )
}
