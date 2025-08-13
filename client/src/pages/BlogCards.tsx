import { api } from "@/constant/api";
import { useState, useEffect } from "react";
import type { Article } from "@/type/blogType";
import Cards from "@/components/cards";

const BlogCards = () => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [apiData, setApiData] = useState<Article[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/blog/get-blog`);
        // console.log(res);
        setApiData(res.data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  // console.log(apiData);

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <Cards apiData={apiData} />
      </section>
    </>
  );
};

export default BlogCards;
