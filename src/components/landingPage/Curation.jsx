import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import useFilePath from "@/hook/useFilePath";
import { faHeart as faHeartRegular } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { useDispatch } from "react-redux";
import { currentPostInit } from "@/modules/redux/ducks/post";
import { convertContraction } from "@/common/common";

const Curation = ({ item }) => {
  const dispatch = useDispatch();
  const { filePath, loading } = useFilePath(item?.thumbnailImage);

  const handleCurrentPostInit = useCallback(() => {
    dispatch(currentPostInit());
  }, [dispatch]);
  return (
    <Link
      to={`/post/detail/${item?.type?.code}/${item?.id}`}
      onClick={handleCurrentPostInit}
    >
      <div className="cx_thumb">
        <span>{!loading && <img src={filePath} alt="사진" />}</span>
      </div>
      <div className="cx_txt">
        <p className="t1 c-blue">{item?.type?.name}</p>
        <p className="h1">{item.title}</p>
        <p className="t1">{item?.author?.nickname}</p>
        <p className="t1">{item.idx || 0}話</p>
        <p className="t_like">
          <span className="i">
            <FontAwesomeIcon icon={faHeart} className="fa-solid fa-heart" />
            <FontAwesomeIcon
              icon={faHeartRegular}
              className="fa-regular fa-heart"
            />
          </span>
          <span>{convertContraction(item?.likeCount)}</span>
        </p>
      </div>
    </Link>
  );
};

export default Curation;
