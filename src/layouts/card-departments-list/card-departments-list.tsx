import { useState } from "react";
import { List, Spin } from "antd";
import { ModalDepartments } from "src/layouts/modal-departments";
import { CardDepartmentss } from "src/components/card-departments";
import { ModalAddDepartment } from "../modal-departments/modal-add-department";
import { MngPageHeader } from "../mng-page-header";
import { useGetDepartmentsQuery } from "src/share/services";
import "./card-departments-list.css";
import { Department } from "src/share/models";

import type { PaginationProps } from "antd";

export const CardDepartments = () => {
  const [visible, setVisible] = useState(false);
  const [queries, setQueries] = useState<{ page: number, itemsPerPage: number }>({ page: 1, itemsPerPage: 5 });
  const [mainDepartment, setMainDepartment] = useState<Department | undefined>();
  const [visibleAddDepartment, setVisibleAddDepartment] = useState(false);
  const showAddDepartment = () => {
    setVisibleAddDepartment(true);
  };

  const { data, isLoading } = useGetDepartmentsQuery(queries);

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  return (
    <>
      <Spin
        spinning={isLoading}
        tip="Loading Departments"
        className="department-card-loading"
        size="large"
      >
        <MngPageHeader
          title="Departments"
          addBtnContent="Create Department"
          addBtnOnClick={showAddDepartment}
          itemCount={data?.total}
          filters={[]}
        />
        <div className="department-card-container">
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
              pageSize: 10,
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
                          manager={department.information?.manager?.username}
                          staffCount={department.information?.total_staff}
                        />
                      </List.Item>
                    );
                  }
                : undefined
            }
          />
        </div>
      </Spin>
      <ModalDepartments
        visible={visible}
        setVisible={setVisible}
        department={mainDepartment}
      />
      <ModalAddDepartment
        visible={visibleAddDepartment}
        setVisible={setVisibleAddDepartment}
      />
    </>
  );
};