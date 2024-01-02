import moment from "moment";
import { News } from "..";

const DisplayNews = ({ news, index }: { news: News; index: number }) => {
  return (
    <div className="bg-violet-100 p-2 gap-2 flex text-black">
      <span>{index + 1}.</span>
      <div className="gap-2">
        <h3 className="font-bold">
          {news.title}
          <span className="font-light px-2">({news.url})</span>
        </h3>
        <div className="flex gap-2">
          <h3 className="font-semibold">{news.author}</h3> |
          <h3>{moment(news.created_at).format("DD-MMM-YYYY")}</h3>
        </div>
      </div>
    </div>
  );
};

export default DisplayNews;
