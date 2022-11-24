import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const BestWebtoon = ({ item }) => {
  const thumbnailImage = useFilePath(item?.thumbnailImage);
  return (
    <Link to="">
      <div
        className="cx_thumb"
        style={{ backgroundColor: item?.backgroundColor }}
      >
        <span>
          <img src={thumbnailImage} alt="" />
        </span>
      </div>
      <div className="cx_txt">
        <p className="h1">{item?.title}</p>
        <p className="t1">
          『神』と名乗る人が現れ任命されたのは『事故処理係』！？
        </p>
      </div>
    </Link>
  );
};

export default BestWebtoon;
