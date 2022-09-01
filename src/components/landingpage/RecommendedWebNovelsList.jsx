import React from "react";
import styled from "styled-components";
import Card from "@/components/landingpage/Card";
import { ApplecoloremojiNormalVulcan32px } from "@/styledMixins";

const RecommendedWebNovelsList = ({ list }) => {
  return (
    <RecommendedWebNovelsListDiv>
      <RecommendedWebNovelsListTitleDiv>
        📝おすすめウェブ小説
      </RecommendedWebNovelsListTitleDiv>
      <RecommendedWebNovelsListItemsDiv>
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
      </RecommendedWebNovelsListItemsDiv>
    </RecommendedWebNovelsListDiv>
  );
};

const RecommendedWebNovelsListDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const RecommendedWebNovelsListTitleDiv = styled.div`
  ${ApplecoloremojiNormalVulcan32px}
  align-self: flex-start;
  min-height: 36px;
  letter-spacing: 1px;
  line-height: 36px;
  white-space: nowrap;
`;

const RecommendedWebNovelsListItemsDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
`;

export default RecommendedWebNovelsList;
