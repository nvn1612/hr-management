import "./sidebar.css";
import { Layout } from "antd";
import { MultiUser } from "src/assets/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";

const items: CustomMenuItem[] = [
  { title: "Accounts", onClick() {}, icon: <MultiUser />, addCallBack() {} },
  { title: "Department", onClick() {}, icon: <MultiUser />, addCallBack() {} },
];

export const Sidebar = () => {
  return (
    <Layout.Sider className='sidebar'>
      <CustomMenu items={items} />
    </Layout.Sider>
  );
};
