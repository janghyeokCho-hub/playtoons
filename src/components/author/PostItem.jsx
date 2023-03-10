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
import { useDispatch } from "react-redux";
import { currentPostInit } from "@/modules/redux/ducks/post";
import Image from "../dashboard/Image";
import { getDateYYYYMMDDHHmm } from "@/common/common";

export default function PostItem (props)  {
  const { item } = props;
  const [post, setPost] = useState(null);
  const [isLock, setIsLock] = useState(true);
  const dispatch = useDispatch();

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

  const handleCurrentPostInit = useCallback(() => {
    dispatch(currentPostInit());
  }, [dispatch]);

  useEffect(() => {
    getPost();
    getPostContent();

    return () => {
      setPost(null);
      setIsLock(true);
    }
  }, [item]);


  return (
    <li className="item ap">
      {post && (
        <Link
          to={`/post/detail/${post.type.code}/${post?.id}`}
          state={{ item: post }}
          onClick={handleCurrentPostInit}
        >
          <div className="thumb center">
            {/* {!loading && <img src={filePath} alt="" />} */}
            <Image hash={item?.thumbnailImage} />

            {/* μ κΈ μμ */}
            {isLock && (
              <div className="area_lock">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faLock} />
                  </p>
                </div>
              </div>
            )}
            {/* μ κΈ λ */}
          </div>
          <div className="txt">
            <p className="h1">{post?.title}</p>
            <p className="t1">{post?.outline}</p>
          </div>
          <div className="botm">
            <p className="d1">
              {getDateYYYYMMDDHHmm(post?.startAt)}
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

