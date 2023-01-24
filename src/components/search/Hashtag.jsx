import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HashtagItem from "./HashtagItem";

const Hashtag = ({ selectTag }) => {
  const posts = useSelector(({ search }) => search.posts);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (selectTag) {
      const items = posts.filter((post) => {
        return post.tags?.some((tag) => tag.id === selectTag.id);
      });

      setItems(items);
    }
  }, [selectTag, posts]);
  return (
    <div className="area_schmain2 inr-c">
      <div className="lst_detail">
        <ul>
          {items?.length > 0 &&
            items?.map((item) => {
              return <HashtagItem item={item} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Hashtag;
