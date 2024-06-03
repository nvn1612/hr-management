import type { Dayjs } from "dayjs";
import { Task } from "src/share/models";

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
  ProjectProperty: ProjectProperty;
  information?: {
    total_user: number;
    total_task: {
      total_task_is_done: number;
      total_task_is_not_done: number;
    };
  };
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

export interface Assignment {
  assignment_id?: string;
  user_property_id?: string;
  project_property_id?: string;
  task_property_id?: string;
  startAt?: string;
  endAt?: string;
  status?: boolean;
  createdBy?: string;
  createdAt?: string;
  task_information?: Task[];
  user_information?: {
    user_id?: string;
    username?: string;
    password?: string;
    email?: string;
    status: boolean;
    phone?: string;
    avatar?: string;
    name?: string;
    birthday?: string;
    createdBy?: string;
    modifiedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    deletedMark: boolean;
  };
}

export interface AssignmentResp {
  assignments: Assignment[];
  total: number;
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  itemsPerPage: number;
}
