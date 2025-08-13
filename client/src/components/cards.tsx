import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Article, EditorContent } from "@/type/blogType";
import CurentUserImage from "./curentUserImage";

const Cards = ({ apiData }: { apiData: Article[] }) => {
  const navigate = useNavigate();

  const extractParaGraph = (content: EditorContent) => {
    const paragraph = content.blocks.find((item) => item.type === "paragraph");
    return paragraph?.data?.text;
  };

  return (
    <section className="flex flex-col justify-center items-center overflow-y-auto">
      {apiData &&
        apiData.map((item, index) => (
          <div
            key={index}
            className="flex w-full max-w-[900px] flex-row justify-between gap-2 rounded-xl p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => navigate(`/blogs-viewer/${item._id}`)}
          >
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row justify-center items-center gap-2">
                <CurentUserImage className="w-8 h-8" />
                <h3 className="ml-2 capitalize">
                  by {item.author && item.author.username}
                </h3>
              </div>
              <div className="w-full flex flex-col justify-center p-2">
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <p className="line-clamp-2">{extractParaGraph(item.content)}</p>
              </div>

              <div className="flex flex-row justify-start items-center gap-4 p-2">
                <Heart />
                {item.likes ? item.likes.length : ""}
                <MessageCircle />
                {item.comments ? item.comments.length : ""}
              </div>
            </div>
            <img
              className="w-[18%] aspect-3/2 border-2 mr-5"
              src={item.image}
              alt="Blog-image"
            />
          </div>
        ))}
    </section>
  );
};

export default Cards;
