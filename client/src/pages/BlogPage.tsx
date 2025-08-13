import { useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/constant/api";
import Like from "@/components/like";
import Comment from "@/components/comment";
import type { Article, EditorContent, EditorBlock } from "@/type/blogType";
import { FormateDate } from "@/components/formateDate";
import { useAppSelector } from "@/hooks/hooks";

interface Props {
  content: EditorContent;
}

interface BlogResponse {
  blog: Article;
}

// interface Listresponse {
//   content: string;
// }

const BlogPage = () => {
  // const defaultImage = "/vite.svg";
  const { id } = useParams();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Article | null>(null);

  const User = useAppSelector((state) => state.user.user);
  // console.log(User);

  useEffect(() => {
    const fetch = async (id: string) => {
      try {
        const { data } = await api.post<BlogResponse>(`/blog/get-blog/${id}`);
        setBlog(data.blog);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    if (id) {
      fetch(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  function convertHtmlEntities(text: string): (string | ReactNode)[] {
    const str = String(text);
    return str
      .split(/<br\s*\/?>|<hr\s*\/?>/i)
      .map((part, i, arr) => [
        part.replace(/&nbsp;/g, "\u00A0"),
        i < arr.length - 1 && <br key={`br-${i}`} />,
      ])
      .flat();
  }

  const EditorContent: React.FC<Props> = ({ content }) => {
    return (
      <div>
        {content.blocks.map((block: EditorBlock, index: number) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={index}>
                  {convertHtmlEntities(String(block.data.text))}
                </p>
              );
            case "header": {
              const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
              return (
                <Tag key={index} className="text-2xl py-2">
                  {block.data.text}
                </Tag>
              );
            }
            case "image": {
              return (
                <figure key={index}>
                  {block?.data?.file && (
                    <img src={block.data.file?.url} alt="Image" />
                  )}
                  {block.data.caption && (
                    <figcaption className="w-full text-center">
                      {convertHtmlEntities(String(block.data.caption))}
                    </figcaption>
                  )}
                </figure>
              );
            }
            case "quote":
              return (
                <div key={index}>
                  <em>{convertHtmlEntities(String(block.data.text))}</em>
                  {block.data.caption && (
                    <span className="font-semibold">{block.data.caption}</span>
                  )}
                </div>
              );
            case "list": {
              const ListTag = block.data.style === "ordered" ? "ol" : "ul";
              return (
                <ListTag key={index}>
                  {block.data.items?.map(
                    (listItem: { content: string }, i: number) => (
                      <li key={i}>{convertHtmlEntities(listItem?.content)}</li>
                    )
                  )}
                </ListTag>
              );
            }

            default:
              return (
                <div key={index}>Unsupported block type: {block.type}</div>
              );
          }
        })}
      </div>
    );
  };

  // console.log(blog);
  return (
    <>
      <section className="mx-auto max-w-[800px] w-full pb-10">
        <h1 className="w-full text-4xl font-medium h-20 mt-10 leading-tight">
          {blog?.title}
        </h1>
        <div className="w-full h-10 flex justify-start items-center mt-5 gap-5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-red-200">
            <img
              src={User?.avatar}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="capitalize ">{blog?.author?.username}</p>
          {blog?.createdAt && <p>{FormateDate(blog.createdAt)}</p>}
          <div className="flex flex-row justify-start items-baseline gap-4 p-2">
            {blog?._id && <Like id={blog?._id} postLikes={blog?.likes} />}
            {blog?._id && <Comment id={blog?._id} />}
          </div>
        </div>
        <div className="relative aspect-video border-4 bg-white border-gray mt-10 overflow-hidden">
          <img
            src={blog?.image}
            alt="image"
            className="w-full h-full object-fill"
          />
        </div>

        <div>{blog?.content && <EditorContent content={blog.content} />}</div>
      </section>
    </>
  );
};

export default BlogPage;
