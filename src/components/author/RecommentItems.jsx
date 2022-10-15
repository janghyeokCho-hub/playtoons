import React from "react";
import RecommentItem from "./RecommentItem";

const RecommentItems = ({ items, handleCurrentAuthor }) => {
  return (
    <div className="lst_author_profile">
      {items &&
        items.map((item, index) => {
          return (
            <RecommentItem
              key={`recomment_${index}`}
              item={item}
              callback={() => handleCurrentAuthor(item)}
            />
          );
        })}
    </div>
  );
};

export default RecommentItems;
