import "./project-info.css";
import { ProjectStaffs } from "src/layouts/project-info/project-staffs";
import { ProjectTasks } from "src/layouts/project-info/project-tasks";
import { ProjectForm } from "src/layouts/project-info/project-form";
import { ProjectDocs } from "src/layouts/project-info/project-docs";

export const ProjectInfo = () => {
  return (
    <div className='project-info-container'>
      <ProjectForm />
      <ProjectStaffs />
      <ProjectDocs />
      <ProjectTasks />
    </div>
  );
};
