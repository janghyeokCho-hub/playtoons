import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import useFilePath from "@/hook/useFilePath";

const WebNovelItem = ({ item }) => {
  const { filePath, loading } = useFilePath(item?.thumbnailImage);
  return (
    <div className="col">
      <a href="#">
        <div className="thumb">
          {!loading && <ImgBgSpan bgImg={filePath}></ImgBgSpan>}
        </div>
        <div className="txt">
          <p className="h1">{item?.title}</p>
          <p className="t1">{item?.outline}</p>
        </div>
      </a>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default WebNovelItem;
