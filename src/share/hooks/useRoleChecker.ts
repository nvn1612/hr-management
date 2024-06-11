import { useGetUserDetailQuery } from "src/share/services/";
import { UserRole } from "../models";

export const useRoleChecker = () => {
  const { data } = useGetUserDetailQuery();
  return (role: UserRole) => data?.UserProperty?.role?.name === role;
};
