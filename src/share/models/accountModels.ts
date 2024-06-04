export const OUserRole = {
  All: "ALL",
  Admin: "ADMIN",
  Manager: "MANAGER",
  Staff: "STAFF",
} as const;

export type UserRole = (typeof OUserRole)[keyof typeof OUserRole];

export interface User {
  user_id?: string;
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  name?: string;
  birthday?: string;
  createdAt?: string;
  createBy?: string;
  UserProperty?: UserProperty;
}

interface UserProperty {
  user_property_id?: string;
  user_id?: string;
  role_id?: string;
  department_id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  deletedMark?: boolean;
}

export interface GetUserResp {
  currentPage: number;
  itemsPerPage: number;
  nextPage?: number;
  previousPage?: number;
  total: number;
  users: User[];
}

export interface LoginResp {
  role: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RoleResp {
  role_id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
}
