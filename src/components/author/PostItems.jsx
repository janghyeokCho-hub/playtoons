import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import { getPostDetailFromServer } from "@API/postService";
import PostItem from "./PostItem";

const PostItems = ({ item }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPostSeries() {
      const response = await getPostDetailFromServer({ id: item.id });
      if (response.status === 200) {
        let result = response.data.post;
        if (!Array.isArray(result)) {
          result = new Array(result);
        }
        setPosts(result);
      }
    }
    if (item?.id && !posts?.length) {
      getPostSeries();
    }
  }, [item, posts]);

  return (
    <>
      <div className="lst_detail">
        <ul>
          {posts &&
            posts.map((item, index) => (
              <PostItem key={`post_${index}`} item={item} />
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
