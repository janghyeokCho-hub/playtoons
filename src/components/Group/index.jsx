import React from "react";
import styled from "styled-components";
import { Border1pxTiara, Body3 } from "@/styledMixins";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

function Group() {
  return (
    <Group1>
      <FontAwesomeIcon icon={faMagnifyingGlass} color="#909DAB" />
      <TxtFormSearch>検索キーワードを入力</TxtFormSearch>
    </Group1>
  );
}

const Group1 = styled.div`
  ${Border1pxTiara}
  height: 40px;
  display: flex;
  padding: 11px 23px;
  align-items: flex-start;
  max-width: 400px;
  background-color: var(--desert-storm);
  border-radius: 21.5px;
`;

const TxtFormSearch = styled.div`
  ${Body3}
  min-width: 400px;
  min-height: 20px;
  margin-left: 8px;
  color: var(--manatee);
  line-height: 20px;
  white-space: nowrap;
  align-self: center;
`;

export default Group;
