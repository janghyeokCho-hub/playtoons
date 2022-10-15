import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentQuote } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import moment from "moment";

const PostItem = ({ item }) => {
  const thumbnailImgURL = useFilePath(item?.thumbnailImage);

  return (
    <li className="item">
      <a href="#">
        <div className="thumb">
          <img src={thumbnailImgURL} alt="" />
        </div>
        <div className="txt">
          <p className="h1">
            {item?.title || "title 이 없을 경우 표시되는 문구"}
          </p>
          <p className="t1">
            {item?.outline ||
              `outline 이 없을 경우 표시되는 문구 근데 outline을 사용하는게 맞나요??`}
          </p>
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
      </a>
    </li>
  );
};

export default PostItem;
