import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import { getPostSeriesCount as getPostSeriesCountAPI } from "@API/postService";

const StoreItem = ({ item }) => {
  const { filePath: thumbnailImgURL, loding: thumbnailImgLoading } =
    useFilePath(item?.coverImage);
  const { filePath: profileImgURL, loading: profileImgLoading } = useFilePath(
    item?.profileImage
  );
  return (
    <div className="cx">
      <a href="#">
        <div className="cx_thumb">
          <span>
            {!thumbnailImgLoading && <img src={thumbnailImgURL} alt="사진" />}
          </span>
          <p className="t_like">
            <FontAwesomeIcon icon={faHeart} />
            <span>{item?.likeCount}</span>
          </p>
        </div>
        <div className="cx_txt">
          <p className="h1">{item?.title}</p>
          <div className="btm">
            <div className="t_profile">
              {!profileImgLoading && (
                <ImgBgSpan bgImg={profileImgURL}></ImgBgSpan>
              )}

              <span>{item?.name}</span>
            </div>
            <p className="c1">
              <strong>{item?.price}</strong>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default StoreItem;
