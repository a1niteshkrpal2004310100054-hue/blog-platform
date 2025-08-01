// import { GalleryVerticalEnd } from "lucide-react";
import LoginForm from "@/components/login-form";
export default function LoginPage() {
  return (
    <div className="bg-muted min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl p-10 shadow-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
