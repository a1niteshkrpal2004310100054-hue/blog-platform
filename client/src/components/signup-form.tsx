import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface Input {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
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
                {...register("name", { required: true })}
              />
              {errors.name && (
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
