import React, { useState } from "react";
<<<<<<< HEAD
import { Modal, Col, Divider, Row, Avatar, Checkbox } from "antd";
import "./modal-add-manager.css";
import { useGetUsersQuery } from "src/share/services";
import { useUpdateManagerDepartmentMutation } from 'src/share/services/departmentServices';
import { Department } from "src/share/models";
=======
import { Modal, Col, Divider, Row, Avatar, Checkbox, message } from "antd";
import "./modal-add-manager.css";
import { useGetUsersQuery } from "src/share/services";
import { useUpdateManagerDepartmentMutation } from "src/share/services/departmentServices";
import { Department } from "src/share/models";
import { randAvaBg } from "src/share/utils";
>>>>>>> main

type ModalAddManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};

export const ModalAddManager = ({
  visible,
  setVisible,
<<<<<<< HEAD
  department
}: ModalAddManagerProps) => {

  const [mainManager, setMainManager] = useState<string | undefined>();
  const {data} = useGetUsersQuery({role:"MANAGER"});
=======
  department,
}: ModalAddManagerProps) => {
  const [mainManager, setMainManager] = useState<string | undefined>();
  const { data } = useGetUsersQuery({ role: "MANAGER" });
>>>>>>> main
  const [selectedManager, setSelectedManager] = useState<number | null>(null);
  const [updateManager] = useUpdateManagerDepartmentMutation();

  const resetModalState = () => {
    setMainManager(undefined);
    setSelectedManager(null);
  };

  const handleUpdateManager = async () => {
<<<<<<< HEAD
      await updateManager({departmentId: department?.department_id, managerId: mainManager});
      setVisible(false);
  };

  const handleCancel = () => {
    resetModalState(); 
=======
    await updateManager({
      departmentId: department?.department_id,
      managerId: mainManager,
    })
      .unwrap()
      .then((value) => {
        message.success("Manager Updated");
      })
      .catch(() => {
        message.error("Failed to update manager");
      });
    setVisible(false);
  };

  const handleCancel = () => {
    resetModalState();
>>>>>>> main
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Select Manager"
        visible={visible}
<<<<<<< HEAD
        onOk={handleUpdateManager}
=======
        onOk={()=>{
          handleUpdateManager();
          setSelectedManager(null);
        }
          }
>>>>>>> main
        onCancel={handleCancel}
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
<<<<<<< HEAD
              {data?.users.filter(user => user.UserProperty?.department_id === null).map((manager, index) => (
                <Col className="gutter-row" span={6} key={index}>
                  <div className="item-list-manager"onClick={() => {setSelectedManager(selectedManager === index ? null : index);
                    setMainManager(manager.user_id)}
                  }>
                    <div className="checkbox-select-staff">
                    <Checkbox 
                      checked={selectedManager === index}
                    />
                    </div>
                    <div className="avatar-manager">
                      <Avatar size={64} src={manager.avatar}/>
                    </div>
                    <div className="name-manager">{manager.name}</div>
                  </div>
                </Col>
              ))}
=======
              {data?.users
                .filter((user) => user.UserProperty?.department_id === null)
                .map((manager, index) => (
                  <Col className="gutter-row" span={6} key={index}>
                    <div
                      className="item-list-manager"
                      onClick={() => {
                        setSelectedManager(
                          selectedManager === index ? null : index
                        );
                        setMainManager(manager.user_id);
                      }}
                    >
                      <div className="checkbox-select-staff">
                        <Checkbox checked={selectedManager === index} />
                      </div>
                      <div className="avatar-manager">
                      <Avatar
                          {...(!manager?.avatar && {
                            style: { background: randAvaBg(), fontSize: "25px" },
                          })}
                          size={50}
                        >
                          {!manager?.avatar &&
                            manager?.username
                              ?.substring(0, 1)
                              .toUpperCase()}
                        </Avatar>
                      </div>
                      <div className="name-manager">{manager.name}</div>
                    </div>
                  </Col>
                ))}
>>>>>>> main
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
};
