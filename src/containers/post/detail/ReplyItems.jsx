import React, { useState, useCallback, useEffect } from "react";
import { getReaction as getReactionAPI } from "@API/reactionService";
import Reply from "./Reply";

const ReplyItems = ({ postId }) => {
  const [reactions, setReactions] = useState(null);

  const getReaction = useCallback(async () => {
    const response = await getReactionAPI({ postId });
    if (response?.status === 200) {
      setReactions(response.data?.reactions);
    }
  }, [postId]);

  useEffect(() => {
    getReaction();
  }, []);
  return (
    <>
      {reactions?.map((item, index) => {
        return <Reply key={`reply_${index}`} item={item} postId={postId} />;
      })}
    </>
  );
};

export default ReplyItems;
