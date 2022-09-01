import React from "react";
import styled from "styled-components";
import Card from "@/components/landingpage/Card";
import { ApplecoloremojiNormalVulcan32px } from "@/styledMixins";

const RecommendedWebtoonList = ({ list }) => {
  return (
    <RecommendedWebtoonListDiv>
      <RecommendedWebtoonListTitleDiv>
        🌈おすすめウェブトゥーン
      </RecommendedWebtoonListTitleDiv>
      <RecommendedWebtoonListItemsDiv>
        {list.map((data, index) => (
          <Card
            key={index}
            imgSrc={data.imgSrc}
            like={data.like}
            category={data.category}
            title={data.title}
            studio={data.studio}
          />
        ))}
      </RecommendedWebtoonListItemsDiv>
    </RecommendedWebtoonListDiv>
  );
};

const RecommendedWebtoonListDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const RecommendedWebtoonListTitleDiv = styled.div`
  ${ApplecoloremojiNormalVulcan32px}
  align-self: flex-start;
  min-height: 36px;
  letter-spacing: 1px;
  line-height: 36px;
  white-space: nowrap;
`;

const RecommendedWebtoonListItemsDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
`;

export default RecommendedWebtoonList;
