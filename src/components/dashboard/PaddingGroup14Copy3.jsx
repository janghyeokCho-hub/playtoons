import React from "react";
import styled from "styled-components";
import { Border1pxTiara, NotosansjpBoldManatee12px } from "@/styledMixins";


function PaddingGroup14Copy3(props) {
  const { className } = props;

  return (
    <PaddingGroup14Copy31 className={`padding-group-14-copy-3 ${className || ""}`}>
      <SF className="sf-1">#SF</SF>
    </PaddingGroup14Copy31>
  );
}

const PaddingGroup14Copy31 = styled.div`
  ${Border1pxTiara}
  height: 27px;
  margin-left: 4px;
  display: flex;
  padding: 4px 7.9px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 45px;
  border-radius: 4px;

  &.padding-group-14-copy-3.padding-group-14-copy-3-1 {
    position: absolute;
    top: 929px;
    left: 596px;
    margin-left: unset;
  }

  &.padding-group-14-copy-3.padding-group-14-copy-3-2 {
    position: absolute;
    top: 595px;
    left: 104px;
    margin-left: unset;
  }
`;

const SF = styled.div`
  ${NotosansjpBoldManatee12px}
  min-height: 17px;
  font-weight: 700;
  letter-spacing: 1.09px;
  line-height: 17px;
  white-space: nowrap;
`;

export default PaddingGroup14Copy3;
