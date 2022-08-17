import React from "react";
import styled from "styled-components";
import { Border1pxTiara, NotosansjpBoldManatee12px } from "@/styledMixins";


function PaddingGroup14Copy72(props) {
  const { className } = props;

  return (
    <PaddingGroup14Copy7 className={`padding-group-14-copy-7-2 ${className || ""}`}>
      <U30a2u30afu30b7u30e7u30f31 className="x-13">#アクション</U30a2u30afu30b7u30e7u30f31>
    </PaddingGroup14Copy7>
  );
}

const PaddingGroup14Copy7 = styled.div`
  ${Border1pxTiara}
  position: absolute;
  height: 27px;
  top: 595px;
  left: 153px;
  display: flex;
  padding: 4px 7.9px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 94px;
  border-radius: 4px;

  &.padding-group-14-copy-7-2.padding-group-14-copy-6-60 {
    position: unset;
    top: unset;
    left: unset;
  }
`;

const U30a2u30afu30b7u30e7u30f31 = styled.div`
  ${NotosansjpBoldManatee12px}
  min-height: 17px;
  font-weight: 700;
  letter-spacing: 1.09px;
  line-height: 17px;
  white-space: nowrap;
`;

export default PaddingGroup14Copy72;
