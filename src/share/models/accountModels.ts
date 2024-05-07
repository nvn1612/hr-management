export const OUserRole = {
  Admin: "admin",
  Manager: "manager",
  Staff: "staff",
} as const;

export type UserRole = (typeof OUserRole)[keyof typeof OUserRole];

export interface User {
  role: UserRole;
  username: string;
  email: string;
  department: string;
  fullname: string;
  monthSalary: number;
  phone: string;
}
