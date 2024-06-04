import React, { useState } from "react";
import { Modal, Col, Divider, Row, Avatar, Checkbox } from "antd";
import "./modal-add-manager.css";
import { useGetUsersQuery } from "src/share/services";
import {useUpdateManagerDepartmentMutation} from 'src/share/services/departmentServices'
import { Department } from "src/share/models";
type ModalAddManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};
export const ModalAddManager = ({
  visible,
  setVisible,
  department
}: ModalAddManagerProps) => {

  const [mainManager, setMainManager] = useState<string | undefined>();

  const {data} = useGetUsersQuery({role:"MANAGER"});
  console.log(data);
  const [selectedManager, setSelectedManager] = useState<number | null>(null);
  
  const [updateManager] = useUpdateManagerDepartmentMutation();

  const handleUpadateManager = async () => {
      await updateManager({departmentId: department?.department_id, managerId: mainManager});
      setVisible(false);
  }

  return (
    <>
      <Modal
        title="Select Manager"
        visible={visible}
        onOk={() => handleUpadateManager()}
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
              {data?.users.filter(user => user.UserProperty?.department_id === null).map((manager, index) => (
                <Col className="gutter-row" span={6} key={index}>
                  <div className="item-list-manager"onClick={() => setSelectedManager(selectedManager === index ? null : index)}>
                    <div className="checkbox-select-staff" onClick={() => setMainManager(manager.user_id)}>
                    <Checkbox 
                      checked={selectedManager === index}
                    />
                    </div>
                    <div className="avatar-manager">
                      <Avatar size={64} src={manager.avartar}/>
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
