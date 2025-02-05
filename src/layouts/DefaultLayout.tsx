import { Outlet } from "react-router";
import Banner from "@/components/Banner";

const DefaultLayout = () => {
  return (
    <div className="min-h-full flex flex-col">
      <Banner />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
