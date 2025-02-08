import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { UserInfo } from "@/types";

const ProtectedLayout = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedLayout;
