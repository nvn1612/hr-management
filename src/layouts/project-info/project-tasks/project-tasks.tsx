import "./project-tasks.css";
import { TaskCard } from "src/components/task-card";
import { Radio } from "antd";

export const ProjectTasks = () => {
  const taskFilterOptions = [
    { label: "All", value: "all" },
    { label: "Finished", value: "finished" },
    { label: "Unfinished", value: "unfinished" },
  ];

  return (
    <div className='task-section'>
      <div className='filter-role'>
        <p>Tasks</p>
        <Radio.Group
          defaultValue='all'
          options={taskFilterOptions}
          optionType='button'
        />
      </div>
      <div className='task-card-container'>
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
};
