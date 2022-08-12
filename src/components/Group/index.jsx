import React from "react";
import styled from "styled-components";
import { Border1pxTiara, Body3 } from "@/styledMixins";


function Group() {
  return (
    <Group1>
      <MagnifyingGlassLight></MagnifyingGlassLight>
      <TxtFormSearch>検索キーワードを入力</TxtFormSearch>
    </Group1>
  );
}

const Group1 = styled.div`
  ${Border1pxTiara}
  height: 44px;
  display: flex;
  padding: 11px 23px;
  align-items: flex-start;
  min-width: 400px;
  background-color: var(--desert-storm);
  border-radius: 21.5px;
`;

const MagnifyingGlassLight = styled.div`
  width: 16px;
  height: 16px;
  align-self: center;
  margin-bottom: 2px;
  background-image: url(@IMAGES/dashboard-ico-search-gnb.png);
  background-size: 100% 100%;
`;

const TxtFormSearch = styled.div`
  ${Body3}
  min-height: 20px;
  margin-left: 8px;
  color: var(--manatee);
  line-height: 20px;
  white-space: nowrap;
`;

export default Group;
