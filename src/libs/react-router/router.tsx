import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login } from "src/pages";
import { UserInfo } from "src/pages/dashboard/user-info";
import { Accounts } from "src/pages/dashboard/accounts";
import App from "src/App";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/login",
    element: <Login />,
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
    ],
  },
]);
