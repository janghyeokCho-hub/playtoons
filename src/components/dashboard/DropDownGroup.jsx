import React, { useEffect, useState } from "react";
import Dropdown from "@/components/dashboard/Dropdown";
import styled from "styled-components";
import { Body1 } from "@/styledMixins";


function Group9(props) {
  const { text_Label, className, dataList, dropdownClassName } = props;

  return (
    <Group91 className={`group-9-2 ${className || ""}`}>
      <TextLabel >{text_Label}</TextLabel>
      <Dropdown dataList={dataList} dropdownClassName={dropdownClassName} />
    </Group91>
  );
}

const Group91 = styled.div`
  position: absolute;
  width: 215px;
  top: 480px;
  left: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 85px;

  &.group-9-2.group-5-8 {
    position: relative;
    margin-top: 24px;
    margin-right: 485px;
    top: unset;
    left: unset;
  }

  &.group-9-2.group-9-3 {
    position: relative;
    margin-top: 24px;
    margin-right: 485px;
    top: unset;
    left: unset;
  }

  &.group-9-2.group-5-9 {
    position: relative;
    margin-top: 24px;
    margin-right: 485px;
    top: unset;
    left: unset;
  }

  &.group-9-2.group-9-4 {
    position: relative;
    margin-top: 24px;
    margin-right: 485px;
    top: unset;
    left: unset;
  }

  &.group-9-2.group-8-1 {
    top: 371px;
  }
`;

const TextLabel = styled.div`
  ${Body1}
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

export default Group9;
