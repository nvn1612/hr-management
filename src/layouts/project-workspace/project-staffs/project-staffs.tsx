import "./project-staffs.css";
import { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import {
  useGetProjectUserPropertiesQuery,
  useGetUsersByPropertiesMutation,
} from "src/share/services";
import { UserOutlined } from "@ant-design/icons";
import { GetUserResp } from "src/share/models";

interface ProjectStaffsProps {
  projectId?: string;
}

export const ProjectStaffs = ({ projectId }: ProjectStaffsProps) => {
  const [page, setPage] = useState<number>(1);
  const [projectStaffs, setProjectStaffs] = useState<GetUserResp | undefined>();
  const [getProjectStaff] = useGetUsersByPropertiesMutation();
  const userPropertyIds = useGetProjectUserPropertiesQuery({ projectId });

  const fetchStaffList = async () => {
    await getProjectStaff({
      values: { user_property_ids: userPropertyIds.data || [] },
      page,
    })
      .unwrap()
      .then((result) => {
        setProjectStaffs(result);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchStaffList();
  }, [projectId]);

  return (
    <div className='project-staffs'>
      <p className='project-section-title'>Staffs</p>
      <List
        pagination={{
          total: projectStaffs?.total,
          onChange: (currPage) => {
            setPage(currPage);
            fetchStaffList();
          },
        }}
        dataSource={projectStaffs?.users}
        renderItem={(user) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={user.avartar ? user.avartar : <UserOutlined />}
                  />
                }
                description={user.username}
              />
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};
