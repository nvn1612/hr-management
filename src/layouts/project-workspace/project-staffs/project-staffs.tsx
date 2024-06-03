import "./project-staffs.css";
import { useEffect, useState } from "react";
import { List, Avatar, Popconfirm, Button, Spin } from "antd";
import {
  useGetProjectUserPropertiesQuery,
  useGetUsersByPropertiesMutation,
  useGetDepartmentStaffsQuery,
} from "src/share/services";
import {
  UserOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { GetUserResp, Project } from "src/share/models";

interface ProjectStaffsProps {
  project?: Project;
}

export const ProjectStaffs = ({ project }: ProjectStaffsProps) => {
  const [page, setPage] = useState<number>(1);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [projectStaffs, setProjectStaffs] = useState<GetUserResp | undefined>();
  const [getProjectStaff, { isLoading: staffLoading }] =
    useGetUsersByPropertiesMutation();
  const userPropertyIds = useGetProjectUserPropertiesQuery({
    projectPropertyId: project?.ProjectProperty.project_property_id,
  });
  const departmentStaffs = useGetDepartmentStaffsQuery({
    departmentId: project?.ProjectProperty.department_id,
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
      <p className='project-section-title'>
        {isAddMode ? "Add New Staff" : "Staffs"}
      </p>
      <Spin spinning={departmentStaffs.isFetching || staffLoading}>
        {isAddMode ? (
          <List
            pagination={{
              total: projectStaffs?.total,
              pageSize: 5,
              onChange: (currPage) => {
                setPage(currPage);
                fetchStaffList();
              },
            }}
            dataSource={
              departmentStaffs.isError ? [] : departmentStaffs.data!.users
            }
            renderItem={(user) => {
              return (
                <List.Item
                  actions={[
                    <Popconfirm
                      title='Assign to project ?'
                      onConfirm={() => {}}
                    >
                      <PlusCircleOutlined className='add-user-icon' />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={user.avartar ? user.avartar : <UserOutlined />}
                      />
                    }
                    title={user.username}
                  />
                </List.Item>
              );
            }}
          />
        ) : (
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
                    >
                      <MinusCircleOutlined />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={user.avartar ? user.avartar : <UserOutlined />}
                      />
                    }
                    title={user.username}
                  />
                </List.Item>
              );
            }}
          />
        )}
      </Spin>
      <Button
        type='default'
        onClick={() => {
          setIsAddMode(!isAddMode);
        }}
      >
        <span className='staff-list-btn-content'>
          {isAddMode ? (
            "Cancel"
          ) : (
            <>
              <PlusOutlined />
              Assign new user
            </>
          )}
        </span>
      </Button>
    </div>
  );
};
