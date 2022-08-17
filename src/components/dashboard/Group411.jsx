import React from "react";
import styled from "styled-components";
import { Body7, Border1pxVioletBlue } from "../../styledMixins";


function Group411() {
  return (
    <Group4>
      <TextLabel>詳細</TextLabel>
      <TextLabel1>お問合せ</TextLabel1>
    </Group4>
  );
}

const Group4 = styled.div`
  ${Body7}
  ${Border1pxVioletBlue}
            height: 32px;
  margin-top: 16px;
  display: flex;
  padding: 8px 54px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 343px;
  border-radius: 4px;
`;

const TextLabel = styled.div`
  min-height: 14px;
  min-width: 29px;
  font-weight: 700;
  color: var(--violet-blue);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel1 = styled.div`
  min-height: 14px;
  margin-left: 47px;
  font-weight: 700;
  color: var(--white);
  line-height: 14px;
  white-space: nowrap;
`;

export default Group411;
