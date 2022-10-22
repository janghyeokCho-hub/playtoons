import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import { Link } from "react-router-dom";
const Item = ({ item }) => {
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);
  return (
    <li>
      {item && (
        <Link to={`/post/detail/novel/${item?.id}`}>
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
            <p className="h1">{item.title}</p>
            <p className="t1">{item.author?.name}</p>
            <p className="t1 c-gray">{item.number || "null"}話</p>
            <div className="lst_tag">
              {item.tags?.map((tag, index) => (
                <div key={`tag_${index}`} className="i_tag">
                  #{tag?.name}
                </div>
              ))}
            </div>
          </div>
        </Link>
      )}
    </li>
  );
};

export default Item;
