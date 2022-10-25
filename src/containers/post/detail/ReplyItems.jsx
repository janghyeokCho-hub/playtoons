import React, { useState, useEffect } from "react";
import Reply from "./Reply";

const ReplyItems = ({ currentPost }) => {
  const [reactions, setReactions] = useState(null);

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
