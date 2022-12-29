import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCommentQuote,
  faHeart,
  faShare,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/pro-light-svg-icons";
import useFilePath from "@/hook/useFilePath";

const TimelineItem = ({ item, isActive }) => {
  const [isControlShow, setIsControlShow] = useState(false);
  const { filePath: thumbnailImage, loading: thumbnailImgLoading } =
    useFilePath(item?.thumbnailImage);
  const { filePath: profileImage, loading: profileImgLoading } = useFilePath(
    item?.author?.profileImage
  );

  return (
    <div className={`col ${isActive ? "active" : ""}`}>
      <div className="bt_bar">
        <div className="bar">
          <span style={{ width: "30%" }}></span>
        </div>
      </div>
      <div className="thumb">
        {!thumbnailImgLoading && <ImgSpan bgImg={thumbnailImage}></ImgSpan>}
      </div>
      <div className="cont">
        <p className="t1">{item?.title}</p>
        <div className="t_profile">
          {!profileImgLoading && (
            <ImgSpan className="im" bgImg={profileImage}></ImgSpan>
          )}

          <p>{item?.nickname}</p>
        </div>
        <button type="button" className="btn-pk n blue">
          フォロー
        </button>
      </div>

      <div className="bt_top">
        <button type="button" className="btn01 view-m">
          <span className="i">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="hidden">prev</span>
        </button>
        <button
          type="button"
          className="btn01"
          onClick={() => setIsControlShow(!isControlShow)}
        >
          <span className="i">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </span>
        </button>
        {isControlShow && (
          <div className="box_drop">
            <ul>
              <li>
                <a href="#" onclick="showComm(this); return false;">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  修正
                </a>
              </li>
              <li>
                <a href="#" onclick="showDrop('popDelete'); return false;">
                  <FontAwesomeIcon icon={faTrash} />
                  削除
                </a>
              </li>
              {/*<!-- <li><a href="#" onclick="showDrop('popReport'); return false;"><i className="fa-light fa-flag"></i>通報</a></li> -->*/}
            </ul>
          </div>
        )}
      </div>
      <div className="bt_botm">
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{item?.likeCount}</span>
        </button>
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faCommentQuote} />
          </span>
          <span>{item?.viewCount}</span>
        </button>
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faShare} />
          </span>
          <span className="hidden">share</span>
        </button>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default TimelineItem;
