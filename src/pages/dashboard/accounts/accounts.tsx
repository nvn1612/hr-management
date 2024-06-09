import "./accounts.css";
import { useEffect, useState } from "react";
import { Spin, List, Typography } from "antd";
import { UserCard } from "src/components/user-card";
import { AccountModal } from "src/layouts";
import { MngPageHeader } from "src/layouts/mng-page-header";
import { useGetUsersQuery } from "src/share/services";
import { filterRoleOptions } from "src/share/utils";
import { OUserRole } from "src/share/models";

import type { PaginationProps } from "antd";
import type { User, UserRole } from "src/share/models";
import type { PageFilter } from "src/layouts/mng-page-header";

export const Accounts = () => {
  const [openAccTab, setOpenAccTab] = useState<boolean>(false);
  const [selectedAcc, setSelectedAcc] = useState<User | undefined>(undefined);
  const [formAction, setFormAction] = useState<"create" | "update">("create");
  const [queries, setQueries] = useState<{
    role: UserRole;
    page: number | undefined;
  }>({ role: OUserRole.All, page: 1 });
  const { Text } = Typography;

  const filters: PageFilter[] = [
    {
      onChange: (value: UserRole) => {
        setQueries({
          ...queries,
          role: value,
        });
      },
      items: {
        label: "Role",
        selector: {
          defaultValue: OUserRole.All,
          options: filterRoleOptions,
        },
      },
    },
  ];

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  const { data, isLoading } = useGetUsersQuery(queries);

  const subRefetch = () => {
    if (selectedAcc) {
      setSelectedAcc((oldState) => {
        return data?.users.find(
          (newState) => newState.user_id === oldState!.user_id
        );
      });
    }
  };

  useEffect(() => {
    subRefetch();
  }, [data]);

  return (
    <>
      <Spin
        spinning={isLoading}
        tip='Loading Accounts'
        className='account-card-loading'
        size='large'
      >
        <MngPageHeader
          title='Accounts'
          itemCount={data ? data.total : 0}
          addBtnContent='Create User'
          addBtnOnClick={() => {
            setSelectedAcc(undefined);
            setOpenAccTab(true);
            setFormAction("create");
          }}
          filters={filters}
        />
        <div className='user-card-container'>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: 10,
              total: data?.total,
              onChange: onChangePage,
            }}
            dataSource={data?.users}
            renderItem={
              data
                ? (user) => {
                    return (
                      <List.Item>
                        <UserCard
                          onClick={() => {
                            setOpenAccTab(true);
                            setSelectedAcc(user);
                            setFormAction("update");
                          }}
                          username={user.username}
                          email={user.email}
                        />
                      </List.Item>
                    );
                  }
                : undefined
            }
          />
        </div>
      </Spin>
      <AccountModal
        selectedAcc={selectedAcc}
        openAccountTab={openAccTab}
        setOpenAccountTab={setOpenAccTab}
        action={formAction}
      />
    </>
  );
};
