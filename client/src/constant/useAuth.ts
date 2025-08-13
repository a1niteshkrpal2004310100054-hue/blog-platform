import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setUser(!!token);
  }, []);

  return user;
};
