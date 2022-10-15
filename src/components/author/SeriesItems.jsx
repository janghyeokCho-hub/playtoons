import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPostSeries as getPostSeriesAPI } from "@API/postService";
import SeriesItem from "./SeriesItem";

const SerieItems = () => {
  const [list, setList] = useState();
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);

  useEffect(() => {
    async function getPostSeries(id) {
      const response = await getPostSeriesAPI(id);
      if (response.status === 200) {
        let result = response?.data?.series;
        if (!Array.isArray(response?.data?.series)) {
          result = new Array(result);
        }
        setList(result);
      }
    }
    if (currentAuthor?.id) {
      getPostSeries(currentAuthor.id);
    }
  }, [currentAuthor]);

  return (
    <div className="lst_series">
      <ul>
        {list &&
          list.map((item, index) => (
            <SeriesItem key={`item_${index}`} item={item} />
          ))}
      </ul>
    </div>
  );
};

export default SerieItems;
