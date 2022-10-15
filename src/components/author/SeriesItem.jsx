import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";

const SeriesItem = ({ item }) => {
  const thumbnailImgURL = useFilePath(item?.coverImage);

  return (
    <li>
      <Link to={`/author/detail/series/${item?.id}`}>
        <div className="thumb">
          <SpanImg bgImg={thumbnailImgURL}></SpanImg>
        </div>
        <div className="txt">
          <p className="t1">{item?.category?.name}</p>
          <p className="h1">{item?.title}</p>
          <button type="button" className="btn-pk s blue2">
            <FontAwesomeIcon icon={faObjectUnion} />
            233
          </button>
        </div>
      </Link>
    </li>
  );
};

const SpanImg = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default SeriesItem;
