import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const Banner = ({ item }) => {
  const thumbnailImgURL = useFilePath(item?.bannerImage);

  return (
    <Link to={item?.link}>
      <span className="hide-m">
        <img src={thumbnailImgURL} alt="이미지" />
      </span>
      <span className="view-m">
        <img src={thumbnailImgURL} alt="이미지" />
      </span>
    </Link>
  );
};

export default Banner;
