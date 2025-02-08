import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Moon, Sun, LogOut, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleDarkMode } from "@/store/slices/authSlice";
import { UserInfo, DarkMode } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const Banner = ({
  title = "Master Your Day, One Task at a Time!",
  subtitle = "Stay organized, stay ahead—plan, track, and accomplish with ease.",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get userInfo and darkMode from the Redux store
  const { userInfo, darkMode } = useSelector(
    (state: { auth: { userInfo: UserInfo; darkMode: string } }) => state.auth
  );

  // Handle dark mode changes
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (darkMode === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, [navigate, darkMode]);

  // Dispatch action to toggle dark mode
  const toggleDarkModeHandler = (mode: DarkMode) => {
    dispatch(toggleDarkMode(mode));
  };

  // Handle user sign out
  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section className="bg-gradient-to-r to-gray-300 via-gray-500 from-gray-700 pb-20 pt-10 mb-4">
      <div className="flex pb-10 pr-10 justify-end items-center gap-x-5">
        {userInfo ? (
          <h1 className="text-right text-lg text-gray-700 ">
            {userInfo.username}
          </h1>
        ) : (
          ""
        )}
        <Select onValueChange={toggleDarkModeHandler} value={darkMode}>
          <SelectTrigger className="p-2 rounded-full dark:bg-emerald-600 hover:dark:bg-emerald-700 bg-emerald-600 hover:bg-emerald-700 w-[38px] focus:ring-transparent border-transparent">
            {darkMode === "dark" ? (
              <Moon size={20} className="text-white" />
            ) : darkMode === "light" ? (
              <Sun size={20} className="text-white" />
            ) : (
              <Monitor size={20} className="text-white" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
        {userInfo ? (
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white border border-emerald-600 hover:border-emerald-700"
          >
            <LogOut className="mr-1" />
            Log Out
          </Button>
        ) : (
          ""
        )}
      </div>

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
