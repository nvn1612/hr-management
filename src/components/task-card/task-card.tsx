import "./task-card.css";
import { Card, Descriptions } from "antd";

import type { DescriptionsProps } from "antd";

interface TaskCardProps {
  onClick: () => void;
}

export const TaskCard = ({ onClick }: TaskCardProps) => {
  const taskDetails: DescriptionsProps["items"] = [
    { key: 1, label: "Start", children: "11/11/1111" },
    { key: 2, label: "Deadline", children: "11/11/1111" },
    { key: 3, label: "Assigned Staffs", children: "Nguyen Van A" },
    { key: 4, label: "Status", children: "Finished" },
  ];

  return (
    <Card title='task name' className='task-card' onClick={onClick}>
      <div className='task-card-details'>
        <Descriptions items={taskDetails} />
      </div>
    </Card>
  );
};
