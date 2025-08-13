import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "@/constant/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Input = {
  email: string;
  password: string;
  error: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    // console.log(data);
    try {
      const res = await api.post(`/user/login`, data);
      console.log(res.data);
      localStorage.setItem("authToken", res.data.accessToken);
      navigate("/", { replace: true });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("login Error");
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
