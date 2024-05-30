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
