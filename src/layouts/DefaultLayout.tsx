import { Outlet } from "react-router";
import Banner from "@/components/Banner";
import { Toaster } from 'sonner';

const DefaultLayout = () => {
  return (
    <div className="min-h-full flex flex-col">
      <Toaster position="top-right" closeButton richColors duration={8000}/>
      <Banner />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
