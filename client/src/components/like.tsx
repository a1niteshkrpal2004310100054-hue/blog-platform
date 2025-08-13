import { useEffect, useState } from "react";
import { addLike, removeLike } from "@/redux/likeSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { Heart } from "lucide-react";
import { api } from "@/constant/api";
import { getCurrentUser } from "@/constant/getUser";

const Like = ({ id, postLikes }: { id: string; postLikes: string[] }) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.like.isLiked);
  const [total, setTotal] = useState<number>(postLikes.length);

  const currentUser = getCurrentUser();
  const UserId = currentUser?.userId;

  useEffect(() => {
    if (postLikes.includes(String(UserId))) {
      dispatch(addLike());
    } else {
      dispatch(removeLike());
    }
  }, [postLikes, UserId, dispatch]);

  const toggleLike = async () => {
    if (!isLiked) {
      await api.post(`/blog/like/${id}`);
      dispatch(addLike());
      setTotal((prev) => prev + 1);
    } else {
      await api.post(`/blog/unlike/${id}`);
      setTotal((prev) => prev - 1);
      dispatch(removeLike());
    }
    return;
  };
  return (
    <>
      <div
        onClick={toggleLike}
        className="flex justify-center items-center flex-row gap-2 cursor-pointer text-xl"
      >
        {isLiked ? (
          <Heart className="fill-red-500 stroke-red-500" />
        ) : (
          <Heart />
        )}
        {total}
      </div>
    </>
  );
};

export default Like;
