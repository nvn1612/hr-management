import React, { useState } from "react";
import { Modal, Col, Divider, Row, Avatar, Checkbox } from "antd";
import "./modal-add-manager.css";
type ModalAddManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModalAddManager = ({
  visible,
  setVisible,
}: ModalAddManagerProps) => {
  const manager = [
    {
      name: "Tung Hoang",
      avatar:
        "https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256",
    },
    {
      name: "Tuan Manh Nguyen",
      avatar:"https://cdn.iconscout.com/icon/free/png-512/free-avatar-372-456324.png?f=webp&w=256",
    },
    {
      name: "Vuong",
      avatar:
        "https://cdn.iconscout.com/icon/free/png-512/free-avatar-380-456332.png?f=webp&w=256",
    },
    {
      name: "Duc Pham",
      avatar:
        "https://cdn.iconscout.com/icon/free/png-512/free-avatar-367-456319.png?f=webp&w=256",
    },
    {
      name: "Duc Manh",
      avatar:
        "https://cdn.iconscout.com/icon/free/png-512/free-avatar-366-456318.png?f=webp&w=256",
    },

  ];
  const [selectedManager, setSelectedManager] = useState<number | null>(null);

  return (
    <>
      <Modal
        title="Select Manager"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
        className="modal-select-manager"
        okText="Save"
      >
        <div className="select-manager-wrapper">
          <p className="decribe-select-manager">
            Select manager for your department
          </p>
          <div className="list-manager">
            <Divider orientation="left" className="title-manager-list">
              List Manager
            </Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {manager.map((manager, index) => (
                <Col className="gutter-row" span={6} key={index}>
                  <div className="item-list-manager"onClick={() => setSelectedManager(selectedManager === index ? null : index)}>
                    <div className="checkbox-select-staff">
                    <Checkbox checked={selectedManager === index} />
                    </div>
                    <div className="avatar-manager">
                      <Avatar size={64} src={manager.avatar}/>
                    </div>
                    <div className="name-manager">{manager.name}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
};
