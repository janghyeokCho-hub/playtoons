import React from "react";
import SeriesItem from "./SeriesItem";
import { useSelector } from "react-redux";
import EmptyDiv from "../dashboard/EmptyDiv";

const SerieItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);

  const renderSeriesList = () => {
    if( !currentAuthor?.series || currentAuthor?.series.length === 0 ){
      return (
        <EmptyDiv
          className={'relative empty'}
          text={`シリーズがいません。`}
        />
      );
    }
    
    return currentAuthor?.series?.map((item, index) => {
      return (
        <SeriesItem key={`item_${index}`} item={item} />
      );
    });
  };

  return (
    <div className="lst_series">
      <ul>
        {
          renderSeriesList()
        }
      </ul>
    </div>
  );
};

export default SerieItems;
