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
        <Link to={`/post/detail/webtoon/${item?.id}`}>
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
            <p className="t1 c-gray">96話 어떤 필드 사용해야 하는지</p>
            <div className="lst_tag">
              {item.tag?.map((t) => (
                <div className="i_tag">{t?.name}</div>
              ))}
            </div>
          </div>
        </Link>
      )}
    </li>
  );
};

export default Item;
