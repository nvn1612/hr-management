import "./App.css";
import { Navigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";

function App() {
  const accessToken = localStorageUtil.get("accessToken");
  return (
    <>
      {accessToken ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
}

export default App;
