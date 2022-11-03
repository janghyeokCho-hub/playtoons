import React from "react";
import { useSelector } from "react-redux";
import StoreItem from "./StoreItem";

const StoreItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  console.log("currentAuthor : ", currentAuthor);
  return (
    <div className="lst_store1 widn">
      {currentAuthor?.series &&
        currentAuthor?.series?.map((item, index) => (
          <StoreItem key={`item_${index}`} item={item} />
        ))}
    </div>
  );
};

export default StoreItems;
