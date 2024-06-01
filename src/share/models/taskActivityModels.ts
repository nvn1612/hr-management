export interface Task {
  task_id: string;
  description: string;
  document: string[];
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  TaskProperty: {
    task_property_id: string;
    task_id: string;
  };
}

export interface TaskResp {
  data: Task[];
  total: number;
  nextPage: number;
  previousPage: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface Actitvity {
  activity_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  ActivityProperty: {
    activity_property_id: string;
    user_property_id: string;
    activity_id: string;
  };
}

export interface ActivityResp {
  data: Actitvity[];
  total: number;
  nextPage: number;
  previousPage: number;
  currentPage: number;
  itemsPerPage: number;
}
