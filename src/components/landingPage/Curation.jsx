import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import useFilePath from "@/hook/useFilePath";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";

const Curation = ({ item }) => {
  console.log("item : ", item);
  const userInfo = useSelector(({ login }) => login.userInfo);
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);
  return (
    <Link to={`/post/detail/${item?.type?.code}/${item?.id}`}>
      <div className="cx_thumb">
        <span>
          <img src={thumbnailImgURL} alt="사진" />
        </span>
        <p className="t_like">
          <FontAwesomeIcon icon={faHeart} />
          <span>{item.likeCount}</span>
        </p>
      </div>
      <div className="cx_txt">
        <p className="t1 c-blue">
          {item.categoryId}카테고리 아이디만 넘어오고 있음 따로 API 없는듯
        </p>
        <p className="h1">{item.title}</p>
        <p className="t1">{userInfo?.name}</p>
        <p className="t1">{item.endAt || 0}話</p>
      </div>
    </Link>
  );
};

export default Curation;
