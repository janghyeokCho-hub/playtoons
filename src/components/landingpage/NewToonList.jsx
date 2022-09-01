import React from "react";
import styled from "styled-components";
import Card from "@/components/landingpage/Card";
import { ApplecoloremojiNormalVulcan32px } from "@/styledMixins";

const NewToons = ({ list }) => {
  return (
    <NewToonsDiv>
      <NewToonsTitleDiv>⚡最新</NewToonsTitleDiv>
      <NewToonsItemsDiv>
        {list.map((data, index) => (
          <Card
            key={`newToon_${index}`}
            imgSrc={data.imgSrc}
            like={data.like}
            category={data.category}
            title={data.title}
            studio={data.studio}
          />
        ))}
      </NewToonsItemsDiv>
    </NewToonsDiv>
  );
};

const NewToonsDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const NewToonsTitleDiv = styled.div`
  ${ApplecoloremojiNormalVulcan32px}
  align-self: flex-start;
  min-height: 36px;
  letter-spacing: 1px;
  line-height: 36px;
  white-space: nowrap;
`;

const NewToonsItemsDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
`;

export default NewToons;
