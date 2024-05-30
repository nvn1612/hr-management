import "./project-card.css";
import { Card } from "antd";
import { DollarOutlined, InfoCircleOutlined } from "@ant-design/icons";

interface ProjectCardProp {
  onClick: () => void;
  projectName?: string;
  investor?: string;
  description?: string;
}

export const ProjectCard = ({
  onClick,
  projectName,
  investor,
  description,
}: ProjectCardProp) => {
  return (
    <Card
      hoverable
      title={projectName}
      onClick={onClick}
      className='project-card'
    >
      <div className='project-card-content'>
        <span className='projec-card-line'>
          <DollarOutlined />
          Investor : {investor ? investor : "None"}
        </span>
        <span className='projec-card-line'>
          <InfoCircleOutlined />
          {description}
        </span>
      </div>
    </Card>
  );
};
