import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Reply from "./Reply";

const ReplyItems = () => {
  const [reactions, setReactions] = useState(null);
  const currentPost = useSelector(({ post }) => post.currentPost);

  useEffect(() => {
    if (currentPost?.reactions) {
      setReactions(currentPost?.reactions || []);
    } else {
      setReactions([]);
    }
  }, [currentPost]);
  return (
    <>
      {reactions?.map((item, index) => {
        return <Reply key={`reply_${index}`} item={item} />;
      })}
    </>
  );
};

export default ReplyItems;
