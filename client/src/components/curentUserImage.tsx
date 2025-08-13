import { useAppSelector } from "@/hooks/hooks";
import { forwardRef } from "react";

type CurentUserImagesProps = React.HTMLAttributes<HTMLDivElement>;

export const CurentUserImage = forwardRef<
  HTMLDivElement,
  CurentUserImagesProps
>(({ className = "", ...props }, ref) => {
  const currentUser = useAppSelector((state) => state.user.user);
  return (
    <div
      ref={ref}
      className={`${className} rounded-full overflow-hidden bg-red-200`}
      {...props}
    >
      <img
        src={currentUser?.avatar}
        alt="Image"
        className="w-full h-full object-cover"
      />
    </div>
  );
});

export default CurentUserImage;
