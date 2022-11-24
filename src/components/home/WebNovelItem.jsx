import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import useFilePath from "@/hook/useFilePath";

const WebNovelItem = ({ item }) => {
  const thumbnailImage = useFilePath(item?.thumbnailImage);
  return (
    <div className="col">
      <a href="#">
        <div className="thumb">
          <ImgBgSpan bgImg={thumbnailImage}></ImgBgSpan>
        </div>
        <div className="txt">
          <p className="h1">{item?.title}</p>
          <p className="t1">
            ショートショート3作目。 朝から電車で乃木坂駅まで移動したさくちゃん。
            マスクと帽子で顔を隠していたつもりが、
            ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
            朝から電車で乃木坂駅まで移動したさくちゃん。
            マスクと帽子で顔を隠していたつもりが、
            ほんのわずかな油断で人だかりが出来てしまい
          </p>
        </div>
      </a>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default WebNovelItem;
