import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostType = ({ item, bgColor, bgImg }) => {
  return (
    <div className="col">
      <Link to={`/${item?.code}`}>
        <div className="thumb ty_b1" style={{ backgroundColor: bgColor }}>
          <ImgBgSpan bgImg={bgImg}></ImgBgSpan>
        </div>
        <div className="txt">
          <p>{item?.name}</p>
        </div>
      </Link>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default PostType;
