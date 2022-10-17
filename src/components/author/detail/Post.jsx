import React, { useState, useEffect } from "react";
import { getPostDetailFromServer as getPostAPI } from "@API/postService";

const Post = ({ id }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPostList() {
      const response = await getPostAPI({ id: id });
      console.log(response);
      if (response.status === 200) {
        setPost(response.data.post);
      }
    }
    if (id && !post) {
      getPostList();
    }
  }, [id, post]);
  return <></>;
};

export default Post;
