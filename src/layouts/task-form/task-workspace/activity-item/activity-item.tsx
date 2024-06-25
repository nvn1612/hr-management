import "./activity-items.css";
import { List, Input, Popover, message } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRoleChecker } from "src/share/hooks";
import { Activity, OUserRole } from "src/share/models";
import {
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} from "src/share/services";

interface ActiItemProp {
  activity: Activity;
  uid: string;
}

export const ActivityItem = ({ activity, uid }: ActiItemProp) => {
  const [editActi, setEditActi] = useState<boolean>();
  const [actiDesc, setActiDesc] = useState<string>(activity.description || "");

  const checkRole = useRoleChecker();

  const [deleteActivity] = useDeleteActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();

  return (
    <>
      <List.Item
        actions={
          !checkRole(OUserRole.Admin) || uid !== activity.user?.user_id
            ? [
                <Popover content={"Edit"}>
                  <EditOutlined
                    className='edit-task-btn'
                    onClick={() => {
                      setEditActi(true);
                    }}
                  />
                </Popover>,
              ]
            : [
                <Popover content={"Edit"}>
                  <EditOutlined
                    className='edit-acti-btn'
                    onClick={() => {
                      setEditActi(true);
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
                          message.success("Successfully delete activity")
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
          title={activity.description}
          description={`${activity.createdAt?.substring(0, 10)} by ${activity.user?.username}`}
        />
        {editActi ?? (
          <Input
            value={actiDesc}
            onChange={(e) => {
              setActiDesc(e.currentTarget.value);
            }}
            onPressEnter={async () => {
              await updateActivity({
                value: { description: actiDesc },
                activityId: activity.activity_id,
              });
              setEditActi(false);
            }}
          />
        )}
      </List.Item>
    </>
  );
};
