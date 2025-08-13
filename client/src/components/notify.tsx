import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Bell, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import {
  getNotifications,
  addNotification,
  deleteNotifications,
  markAllReadNotification,
} from "@/redux/notifySlice";
import { useNavigate } from "react-router-dom";
import { api } from "@/constant/api";
import socket from "@/lib/socket";

const Notify = () => {
  // const defaultImage = "/vite.svg";
  const navigate = useNavigate();
  const notifications = useAppSelector((state) => state.notify.notifications);
  const [loading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/notification/get-notifications`);
        dispatch(getNotifications(res.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetch();

    dispatch(markAllReadNotification());

    socket.on("notification", (data) => {
      dispatch(addNotification(data));
    });

    return () => {
      socket.off("notification");
    };
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClick = async () => {
    try {
      const res = await api.patch("/notification/mark-all-read");
      console.log("mark as read", res.data);
      // dispatch(markAllReadNotification());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const { data } = await api.delete(
        `/notification/delete-notification/${id}`
      );
      console.log(data);
      dispatch(deleteNotifications(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger
          className="w-8 h-8 bg-gray-200 p-0.5 rounded-full"
          asChild
          onClick={() => handleClick()}
        >
          <Bell size={24} />
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-y-auto pb-10">
          <SheetHeader>
            <SheetTitle className="text-2xl">Notifications</SheetTitle>
          </SheetHeader>
          <div className="space-y-2">
            {notifications?.map((item, index: number) => (
              <div
                key={index}
                className="relative flex justify-start items-start hover:bg-gray-200 cursor-pointer group gap-5 py-2 px-5"
                onClick={() => navigate(`/blogs-viewer/${item.targetBlog}`)}
              >
                <div className="max-w-20">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-red-200">
                    <img
                      src={item.sender.avatar}
                      alt="Image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className="absolute top-0 right-1 opacity-0 group-hover:opacity-100"
                  onClick={() => handleDelete(item._id)}
                >
                  <X />
                </div>

                <p className="flex-grow text-[0.9rem] leading-tight">
                  <strong className="capitalize">
                    {item.sender.username}{" "}
                  </strong>
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Notify;
