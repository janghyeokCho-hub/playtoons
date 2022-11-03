import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import { getPostSeriesCount as getPostSeriesCountAPI } from "@API/postService";

const StoreItem = ({ item }) => {
  return (
    <div className="cx">
      <a href="#">
        <div className="cx_thumb">
          <span>
            <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
          </span>
          <p className="t_like">
            <i className="fa-solid fa-heart"></i>
            <span>1.2k</span>
          </p>
        </div>
        <div className="cx_txt">
          <p className="h1">
            大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
          </p>
          <div className="btm">
            <div className="t_profile">
              <ImgBgSpan bgImg={require("@IMAGES/img_profile.png")}></ImgBgSpan>
              <span>Studio reBornStudio reBornStudio reBornStudio reBorn</span>
            </div>
            <p className="c1">
              <strong>1000PC</strong>
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
