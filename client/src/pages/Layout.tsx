import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar";
// import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { api } from "@/constant/api";
import { addUser } from "@/redux/userSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { subscribeUser } from "@/constant/pushHelper";
import socket from "@/lib/socket";

const Layout = () => {
  const dispatch = useAppDispatch();
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/user/getUser`);
        dispatch(addUser(data.user));

        if ("serviceWorker" in navigator && "PushManager" in window) {
          subscribeUser(publicKey, data.user._id);
        }

        if (!socket.connected) {
          socket.connect();
        }

        const registerUser = () => {
          socket.emit("register", data.user._id);
          console.log("User connected with socket with userId", data.user._id);
        };

        socket.on("connect", registerUser);

        if (socket.connected) {
          registerUser();
        }

        return () => {
          socket.off("connect", registerUser);
        };
        
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [dispatch, publicKey]);

  return (
    <>
      <SidebarProvider>
        <div className="flex w-full flex-col h-screen">
          <header className="sticky z-50">
            <Navbar />
          </header>
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />

            <main className="flex-1 overflow-y-auto p-4 bg-muted/50">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Layout;
