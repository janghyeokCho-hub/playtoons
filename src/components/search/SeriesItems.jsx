import { useSelector } from "react-redux";
import SeriesItem from "./SeriesItem";

const SeriesItems = () => {
  const series = useSelector(({ search }) => search.series);
  const seriesMeta = useSelector(({ search }) => search.seriesMeta);
  return (
    <div className="lst_main_comic">
      <ul>
        {series?.length > 0 &&
          series?.map((item, index) => (
            <SeriesItem key={`series_${index}_${item.id}`} item={item} />
          ))}
      </ul>
    </div>
  );
};

export default SeriesItems;
