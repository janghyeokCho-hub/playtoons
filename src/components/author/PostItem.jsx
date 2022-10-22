import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentQuote,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import moment from "moment";
import {
  getPostDetailFromServer as getPostDetilAPI,
  getPostContent as getPostContentAPI,
} from "@/services/postService";

const PostItem = ({ item }) => {
  const [post, setPost] = useState(null);
  const [isLock, setIsLock] = useState(true);
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

  const getPostContent = useCallback(async () => {
    const response = await getPostContentAPI(item?.id);
    if (response.status === 200) {
      setIsLock(false);
    } else {
      setIsLock(true);
    }
  }, [item]);

  useEffect(() => {
    getPost();
    getPostContent();
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

            {/* 잠금 시작 */}
            {isLock && (
              <div className="area_lock">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faLock} />
                  </p>
                </div>
              </div>
            )}
            {/* 잠금 끝 */}
          </div>
          <div className="txt">
            <p className="h1">{post?.title}</p>
            <p className="t1">{post?.outline}</p>
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
              {post?.reactionCount}
            </button>
          </div>
        </Link>
      )}
    </li>
  );
};

export default PostItem;
