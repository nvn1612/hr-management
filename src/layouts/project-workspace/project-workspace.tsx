import "./project-workspace.css";
import { ProjectDocs } from "./project-docs";
import { ProjectStaffs } from "./project-staffs";
import { ProjectTasks } from "./project-tasks";
import { Project } from "src/share/models";

interface ProjectWorkspaceProp {
  project?: Project;
}

export const ProjectWorkspace = ({ project }: ProjectWorkspaceProp) => {
  return (
    <div className='project-workspace'>
      <ProjectDocs project={project} />
      <ProjectStaffs projectId={project?.project_id} />
      <ProjectTasks />
    </div>
  );
};
