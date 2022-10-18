import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentQuote } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import moment from "moment";
import { getPostDetailFromServer as getPostDetilAPI } from "@/services/postService";
import { useCallback } from "react";

const PostItem = ({ item }) => {
  const [post, setPost] = useState(null);
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);

  const getPost = useCallback(async () => {
    const params = {
      id: item.id,
    };
    const response = await getPostDetilAPI(params);
    if (response.status === 200) {
      setPost(response.data.post);
    }
  }, [item]);

  useEffect(() => {
    getPost();
  }, []);

  return (
    <li className="item">
      {post && (
        <Link
          to={`/post/detail/${post.type.code}/${post?.id}`}
          state={{ item: post }}
        >
          <div className="thumb">
            <img src={thumbnailImgURL} alt="" />
          </div>
          <div className="txt">
            <p className="h1">{post?.title}</p>
            <p className="t1">{post?.description || "description 필드 없음"}</p>
          </div>
          <div className="botm">
            <p className="d1">
              {moment(post?.startAt).format("YYYY/MM/DD HH:mm")}
            </p>
            <button type="button" className="btn01">
              <FontAwesomeIcon icon={faHeart} style={{ marginRight: "7px" }} />
              {post?.likeCount}
            </button>
            <button type="button" className="btn01">
              <FontAwesomeIcon
                icon={faCommentQuote}
                style={{ marginRight: "7px" }}
              />
              {post?.viewCount}
            </button>
          </div>
        </Link>
      )}
    </li>
  );
};

export default PostItem;
