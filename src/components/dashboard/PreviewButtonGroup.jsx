import React from "react";
import styled from "styled-components";
import { NotosansjpBoldVioletBlue14px, Border1pxVioletBlue } from "@/styledMixins";


function PaddingGroup3Copy2(props) {
  const { className } = props;

  return (
    <PaddingGroup3Copy className={`padding-group-3-copy-7 ${className || ""}`}>
      <TextLabel className="text_label-177">プレビュー</TextLabel>
    </PaddingGroup3Copy>
  );
}

const PaddingGroup3Copy = styled.div`
  ${Border1pxVioletBlue}
  position: absolute;
  height: 40px;
  top: 1770px;
  left: 1210px;
  display: flex;
  padding: 9px 17.7px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 117px;
  border-radius: 5px;

  &.padding-group-3-copy-7.padding-group-3-copy-8 {
    position: unset;
    top: unset;
    left: unset;
  }

  &.padding-group-3-copy-7.padding-group-3-copy-9 {
    position: unset;
    top: unset;
    left: unset;
  }

  &.padding-group-3-copy-7.padding-group-3-copy-10 {
    top: 1811px;
  }
`;

const TextLabel = styled.div`
  ${NotosansjpBoldVioletBlue14px}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;

export default PaddingGroup3Copy2;
