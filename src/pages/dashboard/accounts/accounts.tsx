import "./accounts.css";
import { useState } from "react";
import { Tabs, Modal, Spin } from "antd";
import { UserCard } from "src/components/user-card";
import { UserInfoForm, UserAdvance } from "src/layouts";
import { useGetUsersQuery } from "src/share/services";

import type { TabsProps } from "antd";
import type { User } from "src/share/models";

export const Accounts = () => {
  const [openUserTab, setOpenUserTab] = useState<boolean>(false);
  const [selectedAcc, setSelectedAcc] = useState<User | null>(null);
  const { data, isLoading } = useGetUsersQuery();

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <UserInfoForm
          {...(selectedAcc !== null ? { initValues: selectedAcc } : {})}
        />
      ),
    },
    {
      key: "2",
      label: "Advanced",
      children: <UserAdvance userRole='staff' />,
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
        <div className='user-card-container'>
          {data?.map((user) => {
            return (
              <UserCard
                onClick={() => {
                  setOpenUserTab(true);
                  setSelectedAcc(user);
                }}
                username={user.username}
                role={user.role}
              />
            );
          })}
        </div>
      </Spin>
      <Modal
        title=' Account Details'
        className='account-detail-modal'
        open={openUserTab}
        onCancel={() => {
          setOpenUserTab(false);
        }}
        onOk={() => {
          setOpenUserTab(false);
        }}
      >
        <Tabs defaultActiveKey='1' items={tabsProps} className='account-tab' />
      </Modal>
    </>
  );
};
