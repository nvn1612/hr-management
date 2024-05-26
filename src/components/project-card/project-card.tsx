import "./project-card.css";
import { Card, Progress } from "antd";
import { TeamOutlined } from "@ant-design/icons";

interface ProjectCardProp {
  onClick: () => void;
  projectName?: string;
  investor?: string;
}

export const ProjectCard = ({
  onClick,
  projectName,
  investor,
}: ProjectCardProp) => {
  return (
    <Card title={projectName} onClick={onClick} className='project-card'>
      <div className='project-card-content'>
        <span>Investor : {investor ? investor : "None"}</span>
        <div className='project-card-team'>
          <TeamOutlined /> 5
        </div>
        <Progress percent={50} />
      </div>
    </Card>
  );
};
