import "./task-workspace.css";
import { Button, Input, List, Upload, message, Typography } from "antd";
import { UploadOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  useCreateActivityMutation,
  useGetTaskActivityQuery,
  useGetTaskFileMutation,
} from "src/share/services";

import type { Task } from "src/share/models";
import { UploadProps } from "antd";
import { localStorageUtil } from "src/share/utils";
import { useEffect, useState } from "react";

interface WorkspaceProps {
  task: Task;
}
const { Text, Title } = Typography;
const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const TaskWorkspace = ({ task }: WorkspaceProps) => {
  const [getFile] = useGetTaskFileMutation();
  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const uploadProps: UploadProps = {
    action: `${baseApi}tasks/upload-file-from-local/${task?.task_id}`,
    headers: {
      authorization: localStorageUtil.get("accessToken")!,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`file too large or bad internet`);
      }
    },
  };

  const [createActivity] = useCreateActivityMutation();
  const { data: actitvityData } = useGetTaskActivityQuery({
    taskPropertyId: task?.TaskProperty.task_property_id,
    items_per_page: "ALL",
  });

  const getLinks = () => {
    setFileLinks([]);
    return task?.document?.map((filename) =>
      getFile({ filename })
        .unwrap()
        .then((link) => {
          setFileLinks([...fileLinks, link]);
        })
    );
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload new Document</Button>
      </Upload>
      {fileLinks.length > 0 && (
        <List
          dataSource={
            task !== undefined && task.document!.length >= 1 ? fileLinks : []
          }
          renderItem={(link) => {
            return (
              <List.Item>
                <a href={link}>{link}</a>
              </List.Item>
            );
          }}
        />
      )}
      <Title level={5}>Activites</Title>
      <Input.TextArea
        style={{ resize: "none", height: "100px" }}
        className='task-text-area'
        placeholder='New activity'
        onPressEnter={async (e) => {
          e.preventDefault();
          createActivity({
            description: (e.target as HTMLInputElement).value,
            task_property_id: task?.TaskProperty.task_property_id,
          })
            .unwrap()
            .then(() => message.success("New task is created"))
            .catch(() => message.error("Failed to create task"));
        }}
      />
      <div className='new-task-btn-sec'>
        <Button type='primary'>
          <ArrowRightOutlined />
        </Button>
      </div>
      {actitvityData && (
        <List
          dataSource={actitvityData ? actitvityData : []}
          renderItem={(activity) => (
            <List.Item>
              <Text>{activity.description}</Text>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
