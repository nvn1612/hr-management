import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login, ForgotPassword } from "src/pages";
import { UserInfo } from "src/pages/dashboard/user-info";
import { Accounts } from "src/pages/dashboard/accounts";
import { CardDepartmentss } from "src/components/card-departments";
import {
  V2,
  Login as LoginV2,
  ForgotPass,
  TestRoute,
  Dashboard as DashboardV2,
  Admin,
  AdminDepartment,
  Account,

} from "src/pages/v2";
import App from "src/App";
import { Projects } from "src/pages/v2/projects";
import { DepartmentProjects } from "src/layouts/v2";
import { Departments } from "src/pages/v2/departments";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/test", element: <CardDepartmentss /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "user-info", element: <UserInfo /> },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/v2",
    element: <V2 />,
    children: [
      {
        path: "login",
        element: <LoginV2 />,
      },
      {
        path: "forgot-password",
        element: <ForgotPass />,
      },
      {
        path: "dashboard",
        element: <DashboardV2 />,
        children: [
          {
            path: "admin",
            element: <Admin />,
            children: [
              { path: "department", element: <DepartmentDetail /> },
              { path: "project", element: <AdminProject /> },
            ],
          },
          {
            path: "admin",
            element: <Admin />,
            children: [{ path: "account", element: <Account /> }],
          },
          {
            path: "admin",
            element: <Admin />,
            children: [{ path: "projects", element: <Projects /> }],
          },
          {
            path: "admin",
            element: <Admin />,
            children: [{ path: "departments", element: <Departments /> }],
          },
        ],
      },
      {
        path: "test-route",
        element: <TestRoute />,
      },
    ],
  },
]);
