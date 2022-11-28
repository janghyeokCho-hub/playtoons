import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";

const Curation = ({ item }) => {
  const { filePath: thumbnailImgURL, loading: thumbnailImgLoading } =
    useFilePath(item?.thumbnailImage);

  return (
    <Link to="">
      <div className="cx_thumb">
        <span>
          {!thumbnailImgLoading && <img src={thumbnailImgURL} alt="사진" />}
        </span>
        <p className="t_like">
          <FontAwesomeIcon icon={faHeart} />
          <span>{item?.likeCount}</span>
        </p>
      </div>
      <div className="cx_txt">
        <p className="t1 c-blue">{item?.type?.name}</p>
        <p className="h1">{item?.title}</p>
        <p className="t1">{item?.author?.nickname}</p>
        <p className="t1">43話</p>
      </div>
    </Link>
  );
};

export default Curation;
