import React, { useEffect, useState } from "react";
import { getPostSeries as getPostSeriesAPI } from "@API/postService";
import SeriesItem from "./SeriesItem";
import { useCallback } from "react";

const SerieItems = ({ item }) => {
  const [list, setList] = useState();
  const getPostSeries = useCallback(async () => {
    const response = await getPostSeriesAPI({ authorId: item.id });
    if (response.status === 200) {
      let result = response?.data?.series;
      if (!Array.isArray(response?.data?.series)) {
        result = new Array(result);
      }
      setList(result);
    }
  }, [item]);

  useEffect(() => {
    getPostSeries();
  }, [item]);

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
