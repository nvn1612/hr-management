import { useEffect, useState } from "react";
import { List, Spin, message } from "antd";
import { ModalDepartments } from "src/layouts/modal-departments";
import { CardDepartmentss } from "src/components/card-departments";
import { ModalAddDepartment } from "../modal-departments/modal-add-department";
import { MngPageHeader } from "../mng-page-header";
import {
  useGetDepartmentsQuery,
  useGetDetailDepartmentQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import "./card-departments-list.css";
import { Department, Department2, OUserRole } from "src/share/models";
import { useRoleChecker } from "src/share/hooks";

import type { PaginationProps } from "antd";

export const CardDepartments = () => {
  const [visible, setVisible] = useState(false);
  const [queries, setQueries] = useState<{
    page: number;
    itemsPerPage: number;
  }>({ page: 1, itemsPerPage: 9 });
  const [mainDepartment, setMainDepartment] = useState<
    Department | undefined
  >();
  const [detailDepartment, setDetailDepartment] = useState<
    Department2 | undefined
  >();
  const [visibleAddDepartment, setVisibleAddDepartment] = useState(false);
  const showAddDepartment = () => {
    setVisibleAddDepartment(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const { data: userDetail } = useGetUserDetailQuery();
  const checkRole = useRoleChecker();
  const { data, isFetching } = useGetDepartmentsQuery(queries, {
    skip: !checkRole(OUserRole.Admin) && !checkRole(OUserRole.ProjectManager),
  });

  const { data: departmentDetail } = useGetDetailDepartmentQuery(
    {
      departmentId: userDetail?.UserProperty?.department_id,
    },
    {
      skip: !checkRole(OUserRole.Admin) || !checkRole(OUserRole.ProjectManager),
    }
  );

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };
  const info = () => {
    message.info("You do not have permission to perform this action");
  };

  const subRefetch = () => {
    if (userDetail?.UserProperty?.role?.name === OUserRole.Admin) {
      setMainDepartment((oldState) => {
        return data?.departments?.find(
          (newState) => newState.department_id === oldState?.department_id
        );
      });
    } else {
      setDetailDepartment(departmentDetail);
    }
  };

  useEffect(() => {
    subRefetch();
  }, [data, departmentDetail]);

  return (
    <>
      <Spin
        spinning={isFetching}
        tip='Loading Departments'
        className='department-card-loading'
        size='large'
      >
        <MngPageHeader
          title='Departments'
          addBtnContent='Create Department'
          addBtnOnClick={
            userDetail?.UserProperty?.role?.name === "MANAGER"
              ? info
              : showAddDepartment
          }
          itemCount={
            userDetail?.UserProperty?.role?.name === "MANAGER" ? 1 : data?.total
          }
          filters={[]}
        />
        <div className='department-card-container'>
          {userDetail?.UserProperty?.role?.name === "MANAGER" ? (
            <CardDepartmentss
              onClick={() => {
                setVisible(true);
                setDetailDepartment(departmentDetail);
              }}
              role={userDetail?.UserProperty?.role?.name}
              title={departmentDetail?.name}
              manager={departmentDetail?.information?.[0]?.manager?.name}
              staffCount={departmentDetail?.information?.[0]?.total_staff}
            />
          ) : userDetail?.UserProperty?.role?.name === "ADMIN" ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 9,
                total: data?.total,
                onChange: onChangePage,
              }}
              dataSource={data?.departments}
              renderItem={
                data
                  ? (department) => {
                      return (
                        <List.Item>
                          <CardDepartmentss
                            onClick={() => {
                              setVisible(true);
                              setMainDepartment(department);
                            }}
                            departmentId={department.department_id}
                            title={department.name}
                            manager={
                              department?.information?.manager?.user_id
                                ? department.information.manager.name
                                : "No Manager"
                            }
                            staffCount={department.information?.total_staff}
                          />
                        </List.Item>
                      );
                    }
                  : undefined
              }
            />
          ) : null}
        </div>
      </Spin>
      <ModalDepartments
        visible={visible}
        setVisible={setVisible}
        department={mainDepartment}
        closeModal={closeModal}
        departmentDetail={detailDepartment}
        role={userDetail?.UserProperty?.role?.name}
      />
      <ModalAddDepartment
        visible={visibleAddDepartment}
        setVisible={setVisibleAddDepartment}
      />
    </>
  );
};
