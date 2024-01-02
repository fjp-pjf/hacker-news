import { useQuery } from "react-query";
import { getNewsToday } from "./api/news";
import DisplayNews from "./components/DisplayNews";
import { useRouter } from "next/navigation";

const NewsComponent = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery("get-news-today", getNewsToday, {
    onError: (err) => {
      router.push("/error");
      console.log(err);
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="py-12 px-6 lg:px-8 w-full">
      <div className="bg-violet-600 flex p-2 items-center justify-between">
        <h1 className="font-bold">Hacker News</h1>
        <h4>Login</h4>
      </div>
      {data ? (
        data?.map((news: News, index: number) => (
          <div key={index}>
            <DisplayNews index={index} news={news} />
          </div>
        ))
      ) : (
        <div className="h-screen flex items-center justify-center">
          Hacker news is not available at the moment.
        </div>
      )}
    </div>
  );
};

export default NewsComponent;

export interface News {
  author: string;
  created_at: string;
  num_comments: number;
  objectID: string;
  story_id: number;
  title: string;
  updated_at: string;
  url: string;
  _tags: string[];
}
