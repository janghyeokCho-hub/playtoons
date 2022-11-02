import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const BestWebtoon = ({ item }) => {
  // const thumbnailImgURL = useFilePath(item?.thumbnailImage);
  return (
    <Link to="">
      <div
        className="cx_thumb"
        style={{ backgroundColor: item?.backgroundColor }}
      >
        <span>
          <img src={require(`@IMAGES/${item?.thumbnailImage}`)} alt="" />
        </span>
      </div>
      <div className="cx_txt">
        <p className="h1">新人さんは事故処理系</p>
        <p className="t1">
          『神』と名乗る人が現れ任命されたのは『事故処理係』！？
        </p>
      </div>
    </Link>
  );
};

export default BestWebtoon;
