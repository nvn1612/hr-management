import "./project-info.css";
import { Input, InputNumber } from "antd";
import { ProjectStaffs } from "src/layouts/project-info/project-staffs";
import { ProjectTasks } from "src/layouts/project-info/project-tasks";

export const ProjectInfo = () => {
  return (
    <div className='project-info-container'>
      <Input addonBefore='Investor' />
      <Input addonBefore='Manager' />
      <InputNumber addonBefore='Revenue' addonAfter='VND' changeOnWheel />
      <ProjectStaffs />
      <ProjectTasks />
    </div>
  );
};
