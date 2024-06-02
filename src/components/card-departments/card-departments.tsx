import React from "react";
import { Card, Popconfirm } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-departments.css";
import { useDeleteDepartmentsMutation } from "src/share/services";

type CardDepartmentssProps = {
  title?: string;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
};

export const CardDepartmentss: React.FC<CardDepartmentssProps> = ({
  title,
  manager,
  onClick,
  departmentId,
  staffCount
}) => {
  const [deleteDepartment] = useDeleteDepartmentsMutation();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    await deleteDepartment({departmentId}).unwrap().then().catch();
  };
  
  return (
    <>
      <Card
        title={
          <span>
            {title}
            <div className="icon-delete-department" onClick={handleDeleteClick}>
              <Popconfirm
                title="Are you sure to delete this department?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => console.log("Delete department")} 
              >
                <DeleteOutlined />
              </Popconfirm>
            </div>
          </span>
        }
        bordered={false}
        className="card-department"
        onClick={onClick}
      >
        <div className="departments-info">
          <div className="manager-departments-info">
            <UserOutlined /> <p>{manager}</p>
          </div>
          <div className="staff-departments-info">
            <TeamOutlined />
            <p>{staffCount}</p>
          </div>
        </div>
      </Card>
    </>
  );
};
