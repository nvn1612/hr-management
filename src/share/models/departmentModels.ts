export interface Department {
  department_id?: string;
  name?: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
  manager_id?: string;
}
export interface allDpmResp {
  departments: Department[];
  total?: number;
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  itemsPerPage: number;
}
