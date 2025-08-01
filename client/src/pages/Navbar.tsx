import Logo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
// import { api } from "@/constant/api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import DropDown from "@/components/dropdown";

const Navbar = () => {
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     const res = await api.post(`/user/logout`);
  //     toast.success(res.data);

  //     localStorage.removeItem("authToken");
  //     navigate("/login", { replace: true });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const pages = [
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "setting",
      url: "/setting",
    },
    {
      name: "Logout",
      url: "/logout",
    },
  ];

  return (
    <nav className="w-full flex items-center border-b border-gray-300 h-[10vh] bg-white">
      <div className="w-full flex justify-between items-center mx-5">
        <div className="flex items-center gap-4 relative">
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
          <Link to="/blog">
            <Button variant="secondary" className="w-20 hover:bg-gray-200">
              Write
            </Button>
          </Link>

          <Link to="/login">
            <Button className="w-20">Login</Button>
          </Link>
          <Link
            to="/notification"
            className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
          >
            <Bell />
          </Link>
          <DropDown data={pages} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
