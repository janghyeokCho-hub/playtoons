import React from "react";
import styled from "styled-components";
import { Border1pxTiara, NotosansjpBoldManatee12px } from "@/styledMixins";


function DetailMobileTagContainer(props) {
  const { children, className } = props;

  return (
    <TagContainer className={`padding-group-14-copy-4 ${className || ""}`}>
      <Tag className="x-4">{children}</Tag>
    </TagContainer>
  );
}

const TagContainer = styled.div`
  ${Border1pxTiara}
  height: 27px;
  margin-right: 4px;
  display: flex;
  padding: 4px 7.9px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 45px;
  border-radius: 4px;
`;

const Tag = styled.div`
  ${NotosansjpBoldManatee12px}
  min-height: 17px;
  font-weight: 700;
  letter-spacing: 1.09px;
  line-height: 17px;
  white-space: nowrap;
`;

export default DetailMobileTagContainer;
