import React from "react";
import styled from "styled-components";
import { NotosansjpBoldWhite14px } from "@/styledMixins";


function PaddingGroup32(props) {
  const { children, className, handleClick } = props;

  return (
    <PaddingGroup3 className={`padding-group-3-9 ${className || ""}`} onClick={handleClick}>
      <TextLabel className="text_label-129">{children}</TextLabel>
    </PaddingGroup3>
  );
}

const PaddingGroup3 = styled.div`
  position: absolute;
  height: 40px;
  top: 1151px;
  left: 1360px;
  display: flex;
  padding: 0 16.7px;
  justify-content: flex-end;
  align-items: center;
  min-width: 102px;
  background-color: var(--violet-blue);
  border-radius: 5px;

  &.padding-group-3-9.padding-group-3-10 {
    top: 1770px;
    left: 1344px;
  }

  &.padding-group-3-9.padding-group-3-11 {
    top: 1875px;
  }

  &.padding-group-3-9.padding-group-3-12 {
    margin-left: 16px;
    position: unset;
    top: unset;
    left: unset;
  }

  &.padding-group-3-9.padding-group-3-14 {
    top: 442px;
    left: 1440px;
  }

  &.padding-group-3-9.padding-group-3-15 {
    margin-left: 16px;
    position: unset;
    top: unset;
    left: unset;
  }

  &.padding-group-3-9.padding-group-3-16 {
    top: 1811px;
    left: 1344px;
  }
`;

const TextLabel = styled.div`
  ${NotosansjpBoldWhite14px}
  min-height: 20px;
  min-width: 65px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;

export default PaddingGroup32;
