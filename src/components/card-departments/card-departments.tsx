import React,{ useState} from "react";
import { Card, Col, Row } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { ModalDepartments } from "src/layouts/modal-departments";
import "./card-departments.css";
export const CardDepartments = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Row gutter={16} className="departments">
      <Col span={8}>
        <Card title="APPLICATION DEVELOPER DEPARTMENT" bordered={false} className="card-department"onClick={() => setVisible(true)}>
          <div className="departments-info">
            <div className="manager-departments-info">
              <UserOutlined /> <p>Van Diep Tran</p>
            </div>
            <div className="staff-departments-info">
              <TeamOutlined />
              <p>20</p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="INFORMATION SECURITY DEPARTMENT" bordered={false}>
          <div className="departments-info">
            <div className="manager-departments-info">
              <UserOutlined /> <p>Tung Hoang</p>
            </div>
            <div className="staff-departments-info">
              <TeamOutlined />
              <p>7</p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="NETWORK INFRASTRUCTUREDEPARTMENT" bordered={false}>
          <div className="departments-info">
            <div className="manager-departments-info">
              <UserOutlined /> <p>MANH TRUONG NGUYEN</p>
            </div>
            <div className="staff-departments-info">
              <TeamOutlined />
              <p>2</p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={8} className="card-row">
        <Card title="INSURANCE DEPARTMENT" bordered={false}>
          <div className="departments-info">
            <div className="manager-departments-info">
              <UserOutlined /> <p>Duc Pham</p>
            </div>
            <div className="staff-departments-info">
              <TeamOutlined />
              <p>4</p>
            </div>
          </div>
        </Card>
      </Col>
      <ModalDepartments visible={visible} setVisible={setVisible} />
    </Row>
    
  );
};
