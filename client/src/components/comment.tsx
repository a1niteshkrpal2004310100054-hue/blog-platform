import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/constant/api";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FormateDate } from "./formateDate";
import { getComments, addComments } from "@/redux/commentSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

interface Inputs {
  text: string;
}

const Comment = ({ id }: { id: string }) => {
  const defaultImage = "/vite.svg";
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comment.comments);
  const [loading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, register, reset } = useForm<Inputs>({
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    const fetch = async (id: string) => {
      const { data } = await api.get(`/comment/get-comment/${id}`);
      // console.log(data.comments);
      dispatch(getComments(data.comments));
    };
    if (id) {
      fetch(id);
    }
  }, [id, dispatch]);

  const onSubmit: SubmitHandler<Inputs> = async (message) => {
    try {
      const { data } = await api.post(`comment/create/${id}`, message);
      // console.log(data.comments);
      dispatch(addComments(data.comments));
      toast.success("Form Submitted");
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <div className="flex flex-row justify-center items-center gap-2">
            <MessageCircle />
            {comments.length}
          </div>
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-y-auto pb-10">
          <SheetHeader>
            <SheetTitle className="text-2xl">
              Responses ({comments.length})
            </SheetTitle>
            {/* <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {/* post comment */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-sm items-center gap-2"
            >
              <Input
                type="text"
                placeholder="Whats on your mind"
                className="focus-visible:ring-0"
                {...register("text")}
              />
              <Button variant="outline" className="w-20 mr-0">
                {loading ? "Posting" : "Respond"}
              </Button>
            </form>
            <div className="flex flex-col justify-center w-full max-w-sm items-start gap-6">
              {comments &&
                comments.map((item, index) => (
                  <div key={index} className="w-full space-y-1">
                    <div className="w-full h-8 flex flex-row justify-start items-center cursor-pointer rounded-full gap-2">
                      <img
                        src={defaultImage}
                        alt="Image"
                        className="w-8 h-8 rounded-full object-fill"
                      />
                      <div className="my-10 leading-4">
                        <p className="capitalize">
                          {item.author?.[0]?.username}
                        </p>
                        <span className="font-light">
                          {FormateDate(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="w-full p-2">
                      <p className="ml-2">{item.text}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Comment;
