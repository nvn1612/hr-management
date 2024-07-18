import { Navigate, Outlet } from "react-router-dom";

export const V2 = () => {
  return (
    <>
      <Navigate to={"login"} />;
      <Outlet />
    </>
  );
};
