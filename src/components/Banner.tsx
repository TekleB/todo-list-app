import { useState } from "react";
import { useNavigate } from "react-router";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { UserInfo } from "@/types/index";

const Banner = ({
  title = "Master Your Day, One Task at a Time!",
  subtitle = "Stay organized, stay ahead—plan, track, and accomplish with ease.",
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section className="bg-gradient-to-r to-gray-300 via-gray-500 from-gray-700 pb-20 pt-10 mb-4">
      {userInfo ? (
        <div className="flex pb-10 pr-10 justify-end items-center gap-x-5">
          <h1 className="text-right text-lg text-gray-700 ">
            {userInfo.username}
          </h1>
          <Button
            size="icon"
            onClick={toggleDarkMode}
            className="p-2 rounded-full dark:bg-emerald-600 hover:dark:bg-emerald-700"
          >
            {darkMode ? (
              <Sun size={20} className="text-white" />
            ) : (
              <Moon size={20} />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white border border-emerald-600 hover:border-emerald-700"
          >
            <LogOut className="mr-1" />
            Log Out
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="my-4 text-xl text-white">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
export default Banner;
