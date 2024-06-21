import "./task-workspace.css";
import {
  Button,
  Input,
  List,
  Upload,
  message,
  Typography,
  Popover,
} from "antd";
import {
  UploadOutlined,
  ArrowRightOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  useCreateActivityMutation,
  useGetTaskActivityQuery,
  useGetTaskFileMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} from "src/share/services";

import { OUserRole, type Task } from "src/share/models";
import { UploadProps } from "antd";
import { localStorageUtil } from "src/share/utils";
import { useEffect, useState } from "react";
import { useRoleChecker } from "src/share/hooks";

interface WorkspaceProps {
  task: Task;
}
const { Title } = Typography;
const baseApi = import.meta.env.VITE_REQUEST_API_URL;

export const TaskWorkspace = ({ task }: WorkspaceProps) => {
  const [fileLinks, setFileLinks] = useState<string[]>([]);
  const [actiDesc, setActiDesc] = useState<string>("");
  const [actiId, setActiId] = useState<string>("");

  const checkRole = useRoleChecker();

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

  const [getFile] = useGetTaskFileMutation();
  const [createActivity] = useCreateActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();
  const { data: activityData } = useGetTaskActivityQuery({
    taskId: task?.task_id,
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
      <div className='acti-container'>
        <Title level={5}>Activites</Title>
        <Input.TextArea
          style={{ resize: "none", height: "100px" }}
          className='task-text-area'
          placeholder='New activity'
          value={actiDesc}
          onChange={(e) => {
            setActiDesc(e.target.value);
          }}
        />
        <div className='new-task-btn-sec'>
          <Button
            type='primary'
            onClick={() => {
              if (!actiId) {
                createActivity({
                  description: actiDesc,
                  task_id: task?.task_id,
                })
                  .unwrap()
                  .then(() => message.success("New activity is created"))
                  .catch(() => message.error("Failed to create activity"));
              } else {
                updateActivity({
                  activityId: actiId,
                  value: { description: actiDesc },
                })
                  .unwrap()
                  .then(() => {
                    message.success("Successful updated activity");
                    setActiId("");
                    setActiDesc("");
                  })
                  .catch(() => message.error("Failed to update activity"));
              }
            }}
          >
            {actiId ? "Update" : "Create"}
            <ArrowRightOutlined />
          </Button>
        </div>
        {activityData && (
          <List
            style={{ width: "100%" }}
            dataSource={activityData ? activityData : []}
            renderItem={(activity) => (
              <List.Item
                actions={
                  !checkRole(OUserRole.Admin)
                    ? [
                        <Popover content={"Edit"}>
                          <EditOutlined
                            className='edit-task-btn'
                            onClick={() => {
                              setActiId(activity.activity_id!);
                              setActiDesc(activity.description || "");
                            }}
                          />
                        </Popover>,
                      ]
                    : [
                        <Popover content={"Edit"}>
                          <EditOutlined
                            className='edit-acti-btn'
                            onClick={() => {
                              setActiId(activity.activity_id!);
                              setActiDesc(activity.description || "");
                            }}
                          />
                        </Popover>,
                        <Popover content={"Delete"}>
                          <DeleteOutlined
                            className='delete-acti-btn'
                            onClick={() => {
                              deleteActivity({
                                activityId: activity.activity_id,
                              })
                                .unwrap()
                                .then(() =>
                                  message.success(
                                    "Successfully delete activity"
                                  )
                                )
                                .catch(() =>
                                  message.error("Failed to delete activity")
                                );
                            }}
                          />
                        </Popover>,
                      ]
                }
              >
                <List.Item.Meta
                  title={`${activity.createdAt?.substring(0, 10)} by ${activity.user?.username}`}
                  description={activity.description}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
};
