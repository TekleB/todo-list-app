import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="h-dvh">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
