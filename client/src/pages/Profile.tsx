import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import Editprofile from "./Editprofile";
import type { Article } from "@/type/blogType";
import { api } from "@/constant/api";
import Cards from "@/components/cards";

const Profile = () => {
  const currentUser = useAppSelector((state) => state.user.user);
  const [active, setIsActive] = useState<number>(0);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [userData, setData] = useState<Article[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/blog/get-blog-byuser`);
        setData(data.blog);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p>loading...</p>;

  const Home = () => <Cards apiData={userData} />;
  const About = () => <div>It's About page</div>;

  const buttons = [
    { label: "Home", component: <Home /> },
    {
      label: "About",
      component: <About />,
    },
  ];

  // console.log(userData);
  return (
    <>
      <section className="mx-auto max-w-[1000px] w-full h-full">
        <div className="flex w-full h-full">
          <div className="flex-grow min-h-0 overflow-y-auto scrollb">
            <div className="w-full h-24 flex flex-col justify-around align-middle space-x-2 pl-1">
              <h1 className="text-3xl font-sans font-bold align-middle capitalize">
                {currentUser?.username}
              </h1>
              <div className="space-x-5">
                {buttons.map((item, index) => (
                  <span
                    key={item.label}
                    onClick={() => setIsActive(index)}
                    className={`cursor-pointer ${
                      active === index
                        ? "text-black border-b border-black"
                        : "opacity-50"
                    }`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {/* <Cards apiData={userData} /> */}
              {buttons[active].component}
            </div>
          </div>

          <div className="w-60 flex-shrink-0 justify-center">
            <div className="flex flex-col grow gap-2 px-2">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-red-200">
                <img
                  src={currentUser?.avatar}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-sans font-semibold capitalize">
                {currentUser?.username}
              </span>
              <Editprofile />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
