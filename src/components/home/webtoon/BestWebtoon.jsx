import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const BestWebtoon = ({ item }) => {
  const { filePath, loading } = useFilePath(item?.characterImage);
  return (
    <Link to="">
      <div className="cx_thumb" style={{ backgroundColor: item?.mainColor }}>
        <span>{!loading && <img src={filePath} alt="" />}</span>
      </div>
      <div className="cx_txt">
        <p className="h1">{item?.title}</p>
        <p className="t1">{item?.outline}</p>
      </div>
    </Link>
  );
};

export default BestWebtoon;
