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

// export interface UserProperty {
//   user_property_id?: string;
//   user_id?: string;
//   role_id?: string;
//   department_id?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   deletedAt?: string;
//   deletedMark?: boolean;
// }
// export interface managerInfo {
//   user_id?: string;
//   username?: string;
//   email?: string;
//   phone?: string;
//   avatar?: string;
//   name?: string;
//   birthday?: string;
//   createdAt?: string;
//   createdBy?: string;
//   user_property: UserProperty[]
// }
 