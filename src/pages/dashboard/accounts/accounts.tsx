import "./accounts.css";
import { useState } from "react";
import { Spin, List, Button, Select, Typography } from "antd";
import { UserCard } from "src/components/user-card";
import { AccountModal } from "src/layouts";
import { useGetUsersQuery } from "src/share/services";
import { filterRoleOptions } from "src/share/utils";

import type { User } from "src/share/models";

export const Accounts = () => {
  const [openAccTab, setOpenAccTab] = useState<boolean>(false);
  const [selectedAcc, setSelectedAcc] = useState<User | null>(null);
  const { data, isLoading } = useGetUsersQuery();
  const { Text } = Typography;
  return (
    <>
      <Spin
        spinning={isLoading}
        tip='Loading Accounts'
        className='account-card-loading'
        size='large'
      >
        <Button
          type='primary'
          onClick={() => {
            setSelectedAcc(null);
            setOpenAccTab(true);
          }}
        >
          Create New User
        </Button>
        <div className='filter-row'>
          <div className='filter-item'>
            <Text className='role-filter-title'>Role: </Text>
            <Select
              className='acc-role-filter'
              options={filterRoleOptions}
              defaultValue={"all"}
            />
          </div>
        </div>
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
