import { api } from "@/constant/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Input {
  username: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log(data);

    try {
      const res = await api.post(`/user/register`, data);
      console.log(res.data);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                type="username"
                placeholder="Name"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-400">name is required</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-400">email is required</span>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-400">password is required</span>
              )}
            </div>
            <Button type="submit" className="w-full">
              SignUp
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
