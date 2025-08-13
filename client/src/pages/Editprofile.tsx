import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "@/constant/api";
import { getCurrentUser } from "@/constant/getUser";
import { addUser } from "@/redux/userSlice";
import { useAppDispatch } from "@/hooks/hooks";

interface Inputs {
  avatar: File | Blob;
  bio: string;
  email: string;
  username: string;
}

const Editprofile = () => {
  const defaultImage = "/vite.svg";
  const [preview, setPreview] = useState<string>(defaultImage);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInputRef: React.RefObject<any> = useRef(null);

  const { handleSubmit, register, setValue } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      avatar: "",
    },
  });

  const handleTriggerInput = () => {
    fileInputRef.current.click();
  };

  const handleRemove = () => {
    setPreview("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setValue("avatar", file, { shouldDirty: true, shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const user = getCurrentUser();
  const Id = user?.userId;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("email", data.email);
    try {
      const { data } = await api.patch(`/user/edit/${Id}`, formData);
      //   console.log(res.data);
      dispatch(addUser(data.user));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className="text-start text-green-500 hover:underline cursor-pointer">
          Edit Profile
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Profile Information
            </DialogTitle>
          </DialogHeader>
          <form
            id="profileForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-start gap-4 mt-5"
          >
            <div className=" flex flex-row justify-center gap-4 px-2">
              <div className="">
                <span>Profile</span>
                <div className="w-20 h-20 rounded-full overflow-hidden bg-red-200">
                  <Label htmlFor="profile">
                    <img
                      src={preview ? preview : defaultImage}
                      alt="Image"
                      className="w-full h-full object-cover"
                    />
                  </Label>
                  <Input
                    id="profile"
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-grow space-x-5 align-top">
                <span
                  onClick={handleTriggerInput}
                  className="cursor-pointer text-green-500"
                >
                  update
                </span>
                <span
                  onClick={handleRemove}
                  className="flex-1 cursor-pointer text-red-500"
                >
                  remove
                </span>
                <p className="mt-5">
                  Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels
                  per side.
                </p>
              </div>
            </div>
            <Label htmlFor="username">Name</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter User Name"
              {...register("username")}
            />
            <Label htmlFor="bio">Bio</Label>
            <textarea
              className="w-full border-2 rounded-sm"
              id="bio"
              placeholder="Add Bio.."
              {...register("bio")}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
          </form>
          <DialogFooter>
            <DialogClose asChild className="space-x-5">
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit" form="profileForm">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Editprofile;
