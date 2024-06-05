import "./project-staffs.css";
import { useEffect, useState } from "react";
import { List, Avatar, Popconfirm, Spin } from "antd";
import {
  useGetProjectUserPropertiesQuery,
  useGetUsersByPropertiesMutation,
  useGetDepartmentStaffsQuery,
} from "src/share/services";

import { randAvaBg } from "src/share/utils";

import { GetUserResp, Project } from "src/share/models";

interface ProjectStaffsProps {
  project?: Project;
}

export const ProjectStaffs = ({ project }: ProjectStaffsProps) => {
  const [page, setPage] = useState<number>(1);
  const [projectStaffs, setProjectStaffs] = useState<GetUserResp | undefined>();

  const [getProjectStaff, { isLoading: staffLoading }] =
    useGetUsersByPropertiesMutation();
  const userPropertyIds = useGetProjectUserPropertiesQuery({
    projectPropertyId: project?.ProjectProperty!.project_property_id,
  });
  const departmentStaffs = useGetDepartmentStaffsQuery({
    departmentId: project?.ProjectProperty!.department_id,
  });

  const fetchStaffList = async () => {
    await getProjectStaff({
      values: { user_property_ids: userPropertyIds.data || [] }, //
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
  }, [project, userPropertyIds.data]);

  return (
    <div className='project-staffs'>
      <p className='project-section-title'>Staffs</p>
      <Spin spinning={departmentStaffs.isFetching || staffLoading}>
        <List
          pagination={{
            total: projectStaffs?.total,
            pageSize: 5,
            onChange: (currPage) => {
              setPage(currPage);
              fetchStaffList();
            },
          }}
          dataSource={projectStaffs?.users}
          renderItem={(user) => {
            return (
              <List.Item
                actions={[
                  <Popconfirm
                    title='Remove from project ?'
                    onConfirm={() => {}}
                  ></Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      {...(user.avatar
                        ? { src: user.avatar }
                        : { style: { background: randAvaBg() } })}
                    >
                      {!user.avatar && user.username!.substring(0, 1)}
                    </Avatar>
                  }
                  title={user.username}
                  description={user.email}
                />
              </List.Item>
            );
          }}
        />
      </Spin>
    </div>
  );
};
