import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { NotosansjpBoldWhite14px, Body7, Title3, Body5 } from "@/styledMixins";

const Card = ({ imgSrc, like, category, title, studio }) => {
  return (
    <CardDiv>
      <CardImgDiv imgSrc={imgSrc}>
        <LikeDiv>
          <FontAwesomeIcon
            icon={faHeart}
            style={{
              width: "12px",
              height: "10px",
              color: "white",
              marginRight: "1em",
            }}
          />
          {like / 1000}k
        </LikeDiv>
      </CardImgDiv>
      <DescriptionDiv>
        <CategoryDiv>{category}</CategoryDiv>
        <TitleDiv>{title}</TitleDiv>
        <StudioDiv>{studio}</StudioDiv>
      </DescriptionDiv>
    </CardDiv>
  );
};
const CardDiv = styled.div`
  margin: 1em;
  width: 215px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardImgDiv = styled.div`
  width: 215px;
  height: 325px;
  background-image: url(${(props) => props.imgSrc});
  background-size: 100% 100%;
  display: flex;
  align-items: flex-end;
`;

const LikeDiv = styled.div`
  ${NotosansjpBoldWhite14px}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.17px;
  line-height: 20px;
  white-space: nowrap;
  margin-left: 1em;
  margin-bottom: 1em;
`;

const DescriptionDiv = styled.div``;

const CategoryDiv = styled.div`
  ${Body7}
  margin-top: 1em;
  margin-bottom: 1em;
  min-height: 14px;
  font-weight: 700;
  color: var(--violet-blue);
  line-height: 14px;
  white-space: nowrap;
`;

const TitleDiv = styled.h1`
  ${Title3}
  min-height: 28px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 28px;
  white-space: nowrap;
`;

const StudioDiv = styled.div`
  ${Body5}
  margin-top: 0.3em;
  min-height: 16px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 16px;
  white-space: nowrap;
`;

export default Card;
