import { Typography, Badge } from "antd";
import "./task-list.css";

import { TaskCard } from "src/components/v2";

export const TaskList = () => {
  return (
    <div className='task-list'>
      <div className='title'>
        <Badge dot className='node' />
        <Typography.Title level={5}>Todo</Typography.Title>
      </div>
      <TaskCard />
      <TaskCard />
    </div>
  );
};
