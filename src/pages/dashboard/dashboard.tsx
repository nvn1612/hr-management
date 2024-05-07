import "./dashboard.css";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Dashboardsidebar } from "src/layouts/dashboard-sidebar";
export const Dashboard = () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Dashboardsidebar />
      <Layout>
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
