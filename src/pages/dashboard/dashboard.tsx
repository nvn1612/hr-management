import "./dashboard.css";
import { Layout } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { Dashboardsidebar } from "src/layouts/dashboard-sidebar";

import { localStorageUtil } from "src/share/utils";

export const Dashboard = () => {
  const accessToken = localStorageUtil.get("accessToken");
  const { Content } = Layout;

  return (
    <>
      {accessToken ? (
        <Layout>
          <Dashboardsidebar />
          <Layout>
            <Content className='content'>
              <Navigate to={"/dashboard/user-info"} />
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};
