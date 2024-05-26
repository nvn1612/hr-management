export interface Project {
  project_id?: string;
  name?: string;
  projectCode?: string;
  description: string;
  startAt: string;
  endAt: string;
  turnover?: string;
  document?: string[];
  investor: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  ProjectProperty: {
    project_property_id: string;
    project_id: string;
    department_id: string;
    client_id: string;
  };
}

export interface ProjectResp {
  data: Project[];
  total?: number;
  nextPage?: number;
  previousPage?: number;
  currentPage?: number;
  itemsPerPage?: number;
}
