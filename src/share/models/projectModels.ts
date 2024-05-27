import type { Dayjs } from "dayjs";

export interface Project {
  project_id?: string;
  name?: string;
  projectCode?: string;
  description?: string;
  startAt?: string | Dayjs | unknown;
  endAt?: string | Dayjs | unknown;
  turnover?: string;
  document?: string[];
  investor?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string;
  ProjectProperty: ProjectProperty[];
}

export interface ProjectProperty {
  project_property_id: string;
  project_id: string;
  department_id: string;
  client_id: string;
}

export interface ProjectResp {
  data: Project[];
  total?: number;
  nextPage?: number;
  previousPage?: number;
  currentPage?: number;
  itemsPerPage?: number;
}

export interface Client {
  client_id: string;
  fullname: string;
  email: string;
  avatar: string;
  address: string;
  phone: string;
  createdBy: string;
  modifiedBy: string;
  ProjectProperty: ProjectProperty[];
}