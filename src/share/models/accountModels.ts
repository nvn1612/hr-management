export const OUserRole = {
  Admin: "admin",
  Manager: "manager",
  Staff: "staff",
} as const;

export type UserRole = (typeof OUserRole)[keyof typeof OUserRole];

export interface User {
  username: string;
  name: string;
  status: boolean;
  birthDay: Date;
  role: UserRole;
  email: string;
  department: string;
  phone: string;
}
