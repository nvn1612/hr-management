export const OUserRole = {
  Admin: "admin",
  Manager: "manager",
  Staff: "staff",
} as const;

export type UserRole = (typeof OUserRole)[keyof typeof OUserRole];

export interface User {
  id?: number;
  username: string;
  name: string;
  status: boolean;
  birthDay: string;
  role: UserRole;
  email: string;
  department: string;
  phone: string;
}

export interface LoginResp {
  accessToken: string;
  refreshToken: string;
}
