import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import { getPosts as getPostsAPI } from "@API/postService";
import PostItem from "./PostItem";
import { getPostTypes as getPostTypesAPI } from "@API/postService";
import { useCallback } from "react";

const PostItems = ({ item }) => {
  const [posts, setPosts] = useState([]);

  /** ===== Post type API Start ===== */
  const [postType, setPostType] = useState([]);
  const [typeId, setTypeId] = useState();
  const getPostTypes = async () => {
    const response = await getPostTypesAPI();
    if (response.status === 200) {
      setPostType(response.data.types);
    }
  };
  useEffect(() => {
    if (!postType?.length) {
      getPostTypes();
    }
  }, [postType]);

  /** ===== Post type API End ===== */
  const getPosts = useCallback(async () => {
    const response = await getPostsAPI({ authorId: item.id });
    if (response.status === 200) {
      let result = response.data.posts;
      if (!Array.isArray(result)) {
        result = new Array(result);
      }
      setPosts(result);
    }
  }, [item]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="lst_detail">
        <ul>
          {posts &&
            posts.map((post, index) => (
              <PostItem key={`post_${index}`} item={post} />
            ))}
        </ul>
      </div>

      <div className="pagenation">
        <ul>
          <li className="prev">
            <a href="#">
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
          <li className="on">
            <a href="#">1</a>
          </li>
          <li className="next">
            <a href="#">
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default PostItems;
