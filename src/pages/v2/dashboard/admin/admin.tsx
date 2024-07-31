import { Sidebar } from "src/components/v2/sidebar";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
