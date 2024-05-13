import "./account-modal.css";
import { Modal, Tabs } from "antd";
import { UserAdvance, UserInfoForm } from "src/layouts";
import { User } from "src/share/models";

import type { TabsProps } from "antd";

interface AccountModalProps {
  selectedAcc?: User | null;
  openAccountTab: boolean;
  setOpenAccountTab: (isOpen: false) => void;
}

export const AccountModal = ({
  selectedAcc,
  openAccountTab,
  setOpenAccountTab,
}: AccountModalProps) => {
  const tabProps: {
    accDetail: TabsProps["items"];
    createAcc: TabsProps["items"];
  } = {
    accDetail: [
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
    ],
    createAcc: [
      {
        key: "1",
        label: "General",
        children: <UserInfoForm />,
      },
    ],
  };

  return (
    <Modal
      title={selectedAcc ? " Account Details" : "Create Account"}
      className='account-detail-modal'
      open={openAccountTab}
      onCancel={() => {
        setOpenAccountTab(false);
      }}
      onOk={() => {
        setOpenAccountTab(false);
      }}
    >
      <Tabs
        defaultActiveKey='1'
        items={selectedAcc ? tabProps.accDetail : tabProps.createAcc}
        className='account-tab'
      />
    </Modal>
  );
};
