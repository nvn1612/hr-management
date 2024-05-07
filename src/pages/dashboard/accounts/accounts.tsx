import "./accounts.css";
import { useState } from "react";
import { Tabs, Modal } from "antd";
import { UserCard } from "src/components/user-card";
import { UserInfoForm } from "src/layouts/user-info-form";
import { UserAdvance } from "src/layouts/user-advance/";
import { useGetUsersQuery } from "src/share/services/accountServices";

import type { TabsProps } from "antd";

export const Accounts = () => {
  const [openUserTab, setOpenUserTab] = useState<boolean>(false);
  const { data } = useGetUsersQuery();

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <UserInfoForm
          initValues={{
            username: "devil666",
            fullname: "Nguyen Van A",
            address: "a to b to c in 1 in 2 in 3",
            email: "nonamemail123@gmail.com",
          }}
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
      <div className='user-card-container'>
        {data?.map((user) => {
          return (
            <UserCard
              onClick={() => {
                setOpenUserTab(true);
                console.log(user);
              }}
              username={user.username}
              role={user.role}
            />
          );
        })}
      </div>
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
