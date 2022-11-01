import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";

const Curation = ({ item }) => {
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);

  return (
    <Link to="">
      <div class="cx_thumb">
        <span>
          <img src={thumbnailImgURL} alt="사진" />
        </span>
        <p class="t_like">
          <FontAwesomeIcon icon={faHeart} />
          <span>1.2k</span>
        </p>
      </div>
      <div class="cx_txt">
        <p class="t1 c-blue">ウェブトゥーン</p>
        <p class="h1">
          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
        </p>
        <p class="t1">Studio reBorn</p>
        <p class="t1">43話</p>
      </div>
    </Link>
  );
};

export default Curation;
