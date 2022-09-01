import React from "react";
import styled from "styled-components";
import { ApplecoloremojiNormalVulcan32px } from "@/styledMixins";
import ProducerCard from "@/components/landingpage/ProducerCard";

const ProducerList = ({ list }) => {
  return (
    <ProducerDiv>
      <ProducerTitleDiv>🎨クリエーター</ProducerTitleDiv>
      <ProducerItemsDiv>
        {list.map((data, index) => (
          <ProducerCard
            key={`profile_${index}`}
            bgImgSrc={data.bgImgSrc}
            profileImgSrc={data.profileImgSrc}
            alias={data.alias}
            intro={data.intro}
          />
        ))}
      </ProducerItemsDiv>
    </ProducerDiv>
  );
};

const ProducerDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const ProducerTitleDiv = styled.div`
  ${ApplecoloremojiNormalVulcan32px}
  align-self: flex-start;
  min-height: 36px;
  letter-spacing: 1px;
  line-height: 36px;
  white-space: nowrap;
`;

const ProducerItemsDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ProducerList;
