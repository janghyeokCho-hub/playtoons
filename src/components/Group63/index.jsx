import React from "react";
import styled from "styled-components";
import { Title3 } from "@/styledMixins";


function Group63(props) {
  const { text_Label } = props;

  return (
    <Group6>
      <ChevronLeftSolid></ChevronLeftSolid>
      <TextLabel>{text_Label}</TextLabel>
    </Group6>
  );
}

const Group6 = styled.div`
  position: absolute;
  height: 28px;
  top: 36px;
  left: 350px;
  display: flex;
  align-items: center;
  min-width: 176px;
`;

const ChevronLeftSolid = styled.div`
  width: 11px;
  height: 20px;
  background-image: url(/img/dashboardreactionlist-path-522DB863-8848-4F2E-8A17-4C2321C859BA@2x.png);
  background-size: 100% 100%;
`;

const TextLabel = styled.div`
  ${Title3}
  min-height: 28px;
  margin-left: 16px;
  min-width: 152px;
  font-weight: 500;
  color: var(--deep-space-sparkle);
  line-height: 28px;
  white-space: nowrap;
`;

const Group61 = styled.div`
  position: absolute;
  height: 28px;
  top: 36px;
  left: 350px;
  display: flex;
  align-items: center;
  min-width: 176px;
`;

const ChevronLeftSolid1 = styled.div`
  width: 11px;
  height: 20px;
  background-image: url(/img/dashboardreactionlist-path-522DB863-8848-4F2E-8A17-4C2321C859BA@2x.png);
  background-size: 100% 100%;
`;

const TextLabel1 = styled.div`
  ${Title3}
  min-height: 28px;
  margin-left: 16px;
  min-width: 152px;
  font-weight: 500;
  color: var(--deep-space-sparkle);
  line-height: 28px;
  white-space: nowrap;
`;

const Group62 = styled.div`
  position: absolute;
  height: 28px;
  top: 36px;
  left: 350px;
  display: flex;
  align-items: center;
  min-width: 176px;
`;

const ChevronLeftSolid2 = styled.div`
  width: 11px;
  height: 20px;
  background-image: url(/img/dashboardreactionlist-path-522DB863-8848-4F2E-8A17-4C2321C859BA@2x.png);
  background-size: 100% 100%;
`;

const TextLabel2 = styled.div`
  ${Title3}
  min-height: 28px;
  margin-left: 16px;
  min-width: 152px;
  font-weight: 500;
  color: var(--deep-space-sparkle);
  line-height: 28px;
  white-space: nowrap;
`;

export default Group63;
