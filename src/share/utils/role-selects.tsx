import { Typography } from "antd";
import { OUserRole } from "src/share/models";

import type { DefaultOptionType } from "antd/es/select";

const { Text } = Typography;
export const userRoleOptions: DefaultOptionType[] = [
  { label: <Text>Admin</Text>, value: OUserRole.Admin },
  { label: <Text>Manager</Text>, value: OUserRole.Manager },
  { label: <Text>Staff</Text>, value: OUserRole.Staff },
];
export const filterRoleOptions: DefaultOptionType[] = [
  { label: <Text>All</Text>, value: "all" },
  { label: <Text>Admin</Text>, value: OUserRole.Admin },
  { label: <Text>Manager</Text>, value: OUserRole.Manager },
  { label: <Text>Staff</Text>, value: OUserRole.Staff },
];
