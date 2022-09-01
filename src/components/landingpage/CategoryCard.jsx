import React from "react";
import styled from "styled-components";
import { Title3 } from "@/styledMixins";

const CategoryCard = ({ bgImgSrc, bgColor, name }) => {
  return (
    <CategoryCardDiv>
      <CategoryCardImgDiv bgImgSrc={bgImgSrc} bgColor={bgColor} />
      <CategoryCardName>{name}</CategoryCardName>
    </CategoryCardDiv>
  );
};

const CategoryCardDiv = styled.div`
  position: relative;
  margin: 1em;
  width: 380px;
  height: 281px;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid;
  border-color: var(--tiara);
  text-align: center;
`;

const CategoryCardImgDiv = styled.div`
  width: 379px;
  height: 215px;
  background-color: var(${(props) => props.bgColor});
  background-image: url(${(props) => props.bgImgSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 10px 10px 0px 0px;
`;

const CategoryCardName = styled.h1`
  ${Title3}
  width: 380px;
  height: 66px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 66px;
  white-space: nowrap;
`;

export default CategoryCard;
