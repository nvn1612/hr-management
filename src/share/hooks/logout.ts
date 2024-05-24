import { localStorageUtil } from "src/share/utils";
import { useNavigate } from "react-router-dom";

export const useLogout = (): void => {
  const navigate = useNavigate();
  localStorageUtil.delete("accessToken");
  localStorageUtil.delete("refreshToken");
  navigate("login");
};
