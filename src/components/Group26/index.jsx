import React from "react";
import styled from "styled-components";
import { Body6 } from "@/styledMixins";

function Group26(props) {
  const { line, className } = props;

  return (
    <Group2 className={`group-2-21 ${className || ""}`}>
      <TextLabel className="text_label-220">
        パスワードをお忘れですか?
      </TextLabel>
      <Line className="line-8" src={line} />
    </Group2>
  );
}

const Group2 = styled.div`
  cursor: pointer;
  width: 188px;
  align-self: flex-end;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 18px;

  &.group-2-21.group-2-22 {
    margin-right: 2px;
    min-height: 19px;
  }

  &.group-2-21.group-2-23 {
    margin-right: 16px;
  }
`;

const TextLabel = styled.div`
  ${Body6}
  min-height: 16px;
  color: var(--violet-blue);
  line-height: 16px;
  white-space: nowrap;
`;

const Line = styled.img`
  width: 190px;
  height: 3px;
  margin-left: -0.5px;
`;

const LineTxt = styled.img`
  .group-2-21.group-2-22 & {
    height: 2px;
  }
`;

export default Group26;
