import Logo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DropDown from "@/components/dropdown";
import Notify from "@/components/notify";
import { useAppSelector } from "@/hooks/hooks";

import type { RootState } from "@/redux/store";

const Navbar = () => {
  const unReadMessage = useAppSelector(
    (state: RootState) =>
      state.notify.notifications.filter((n) => !n.isRead).length
  );

  const pages = [
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "setting",
      url: "#",
    },
    {
      name: "Logout",
      url: "/logout",
    },
  ];

  const data = localStorage.getItem("authToken");

  return (
    <nav className="w-full flex items-center border-b border-gray-300 h-16 bg-white">
      <div className="w-full flex justify-between items-center mx-5">
        <div className="flex items-center gap-4 relative">
          <SidebarTrigger />
          <Link to="/">
            <img src={Logo} alt="Logo" className="p-2 ml-6 h-10" />
          </Link>
          <label className="relative outline-none">
            <Input
              type="text"
              placeholder="search"
              className="w-[18rem] pr-10 rounded-full outline-none"
            />
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </label>
        </div>

        <div className="flex space-x-6 items-center">
          <Link to="/create">
            <Button variant="secondary" className="w-20 hover:bg-gray-200">
              Write
            </Button>
          </Link>
          {data ? (
            <div className="relative w-[20%] space-x-1">
              <Notify />
              <span className="absolute -top-2 right-1 text-yellow-800">
                {unReadMessage}
              </span>
            </div>
          ) : (
            <Link to="/login">
              <Button className="w-20">Login</Button>
            </Link>
          )}

          <DropDown data={pages} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
