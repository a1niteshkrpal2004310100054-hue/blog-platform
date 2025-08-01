import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
    toast.success("User Logged out");
  }, [navigate]);
  return null;
};

export default Logout;
