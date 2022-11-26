import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const BestWebtoon = ({ item }) => {
  const characterImage = useFilePath(item?.characterImage);
  return (
    <Link to="">
      <div className="cx_thumb" style={{ backgroundColor: item?.mainColor }}>
        <span>
          <img src={characterImage} alt="" />
        </span>
      </div>
      <div className="cx_txt">
        <p className="h1">{item?.title}</p>
        <p className="t1">{item?.outline}</p>
      </div>
    </Link>
  );
};

export default BestWebtoon;
