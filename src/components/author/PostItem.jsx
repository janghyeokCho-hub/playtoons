import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentQuote } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import moment from "moment";

const PostItem = ({ item }) => {
  console.log(item);
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);

  return (
    <li className="item">
      <Link to={`/author/detail/post/${item?.id}`} state={{ item: item }}>
        <div className="thumb">
          <img src={thumbnailImgURL} alt="" />
        </div>
        <div className="txt">
          <p className="h1">{item?.title}</p>
          <p className="t1">{item?.series?.description}</p>
        </div>
        <div className="botm">
          <p className="d1">{moment(item?.endAt).format("YYYY/MM/DD HH:mm")}</p>
          <button type="button" className="btn01">
            <FontAwesomeIcon icon={faHeart} style={{ marginRight: "7px" }} />
            {item?.likeCount}
          </button>
          <button type="button" className="btn01">
            <FontAwesomeIcon
              icon={faCommentQuote}
              style={{ marginRight: "7px" }}
            />
            {item?.viewCount}
          </button>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
