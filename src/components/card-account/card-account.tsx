import React, { useState } from "react";
import { Button, Card, Col, Modal, Popconfirm, Row, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-account.css";
import { useDeleteDepartmentsMutation } from "src/share/services";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import UpdateUserModal from "../modal-update-user";
type CardAccount = {
  username?: string;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
  role?: string;
};

export const CardAccount: React.FC<CardAccount> = ({
  username,
  manager,
  onClick,
  departmentId,
  staffCount,
  role,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [deleteDepartment] = useDeleteDepartmentsMutation();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const deleteDapartment = async () => {
    await deleteDepartment({ departmentId }).unwrap().then().catch();
  };

  return (
    <div className="card-account-container">
      <Card
        hoverable
        bordered={false}
        className="card-account"
        onClick={onClick}
      >
        <div className="account-wrapper">
          <Row className="account-header">
            <Col span={12} className="account-header-info">
              <h3>{username}</h3>
              <div className="account-role">Admin</div>
            </Col>
            <Col span={12} className="account-header-action">
              {role !== "MANAGER" ? (
                <Space>
                  <div
                    onClick={showModal}
                    className="account-header-action-button"
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className="account-header-action-button icon-delete-account"
                    onClick={handleDeleteClick}
                  >
                    <Popconfirm
                      title="Are you sure to delete this account?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={deleteDapartment}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </Space>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row className="account-body">
            <Col span={12} className="account-body-info">
              <div className="">
                <span>Vu Trong Dat</span>
              </div>
              <div>
                <span>
                  <strong>Email:</strong> datvuhp2002@gmail.com
                </span>
              </div>
              <div>
                <span>
                  <strong>Contact:</strong> 0395741123
                </span>
              </div>
              <div>
                <span>
                  <strong>Department:</strong> It department
                </span>
              </div>
            </Col>
            <Col span={12} className="account-body-avatar">
              <CustomAvatar size={100} userName="Dat" />
            </Col>
          </Row>
          <UpdateUserModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          ></UpdateUserModal>
        </div>
      </Card>
    </div>
  );
};
