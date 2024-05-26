import { Project } from "src/share/models";
import "./project-info.css";

import { ProjectForm } from "src/layouts/project-info/project-form";

interface ProjectInfoProp {
  project: Project;
}

export const ProjectInfo = ({ project }: ProjectInfoProp) => {
  return (
    <div className='project-info-container'>
      <ProjectForm />
    </div>
  );
};
