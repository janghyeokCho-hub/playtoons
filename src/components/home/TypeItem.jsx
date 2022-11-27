import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";

const TypeItem = ({ item }) => {
  const { filePath: thumbImage, loading } = useFilePath(item?.iconImage);
  return (
    <div className="col">
      <Link to={`/${item?.code}`}>
        <div className="thumb wid1">
          {!loading && <img src={thumbImage} alt="" />}
        </div>
        <div className="txt" style={{ backgroundColor: "#fff" }}>
          <p className="c-black">{item?.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default TypeItem;
