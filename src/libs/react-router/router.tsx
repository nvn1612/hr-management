import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login } from "src/pages";
import { Avatar } from "src/avatar";
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
  },
]);
