import "./project-workspace.css";
import { ProjectDocs } from "./project-docs";
import { ProjectStaffs } from "./project-staffs";
import { ProjectTasks } from "./project-tasks";

export const ProjectWorkspace = () => {
  return (
    <div className='project-workspace'>
      <ProjectDocs />
      <ProjectStaffs />
      <ProjectTasks />
    </div>
  );
};
