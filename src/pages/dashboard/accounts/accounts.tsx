import "./accounts.css";
import { useState } from "react";
import { Spin, List, Typography } from "antd";
import { UserCard } from "src/components/user-card";
import { AccountModal } from "src/layouts";
import { MngPageHeader } from "src/layouts/mng-page-header";
import { useGetUsersQuery } from "src/share/services";
import { filterRoleOptions } from "src/share/utils";

import type { User, MngFilterItem } from "src/share/models";

export const Accounts = () => {
  const [openAccTab, setOpenAccTab] = useState<boolean>(false);
  const [selectedAcc, setSelectedAcc] = useState<User | null>(null);
  const { data, isLoading } = useGetUsersQuery();
  const { Text } = Typography;

  const filters: MngFilterItem[] = [
    {
      label: "Role",
      selector: {
        defaultValue: "all",
        options: filterRoleOptions,
      },
    },
    {
      label: "Department",
      selector: {
        defaultValue: "all",
        options: [{ label: <Text>All</Text>, value: "all" }],
      },
    },
  ];

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
          itemCount={data ? data.length : 0}
          addBtnContent='Create User'
          addBtnOnClick={() => {
            setSelectedAcc(null);
            setOpenAccTab(true);
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
            pagination={{ position: "bottom", align: "center", pageSize: 10 }}
            dataSource={data}
            renderItem={(user) => {
              return (
                <List.Item>
                  <UserCard
                    onClick={() => {
                      setOpenAccTab(true);
                      setSelectedAcc(user);
                    }}
                    username={user.username}
                    role={user.role}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </Spin>
      <AccountModal
        selectedAcc={selectedAcc}
        openAccountTab={openAccTab}
        setOpenAccountTab={setOpenAccTab}
      />
    </>
  );
};
