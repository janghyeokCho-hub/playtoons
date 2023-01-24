import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostItem = ({ item }) => {
  const { filePath: thumbnailImg, loading: thumbnailImgLoading } = useFilePath(
    item?.thumbnailImage
  );
  return (
    <Link to="">
      <div className="cx_thumb">
        <span>{!thumbnailImgLoading && <img src={thumbnailImg} alt="" />}</span>
        <p className="t_like">
          <FontAwesomeIcon icon={faHeart} size="xs" />
          <span>{item?.likeCount}</span>
        </p>
      </div>
      {/*<!-- 202209 ico수정 -->*/}
      <div className="cx_txt">
        <p className="t1 c-blue">{item?.type?.name}</p>
        <p className="h1">{item?.title}</p>
        <p className="t1">{item?.author?.nickname}</p>
        <p className="t1">{item?.number}話</p>
      </div>
    </Link>
  );
};
export default PostItem;
