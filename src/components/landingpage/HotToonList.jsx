import React from "react";
import styled from "styled-components";
import { ApplecoloremojiNormalVulcan32px } from "@/styledMixins";
import Card from "@/components/landingpage/Card";

const HotToons = ({ list }) => {
  return (
    <HotToonsDiv>
      <HotToonsTitleDiv>🔥人気</HotToonsTitleDiv>
      <HotToonsItemsDiv>
        {list.map((data, index) => (
          <Card
            key={`hotToon_${index}`}
            imgSrc={data.imgSrc}
            like={data.like}
            category={data.category}
            title={data.title}
            studio={data.studio}
          />
        ))}
      </HotToonsItemsDiv>
    </HotToonsDiv>
  );
};

const HotToonsDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const HotToonsTitleDiv = styled.div`
  ${ApplecoloremojiNormalVulcan32px}
  align-self: flex-start;
  min-height: 36px;
  letter-spacing: 1px;
  line-height: 36px;
  white-space: nowrap;
`;

const HotToonsItemsDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
`;

export default HotToons;
