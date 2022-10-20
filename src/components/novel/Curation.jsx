import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const Curation = ({ item }) => {
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);

  return (
    <Link to={`/post/detail/novel/${item.id}`}>
      <img src={thumbnailImgURL} alt="이미지" />
    </Link>
  );
};

export default Curation;
