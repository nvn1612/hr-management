import "./project-card.css";
import { Card, Progress } from "antd";
import { TeamOutlined } from "@ant-design/icons";

interface ProjectCardProp {
  onClick: () => void;
}

export const ProjectCard = ({ onClick }: ProjectCardProp) => {
  return (
    <Card title='Project Name' onClick={onClick} className='project-card'>
      <div className='project-card-content'>
        <span>Investor : ABCXYZ</span>
        <div className='project-card-team'>
          <TeamOutlined /> 5
        </div>
        <Progress percent={50} />
      </div>
    </Card>
  );
};
