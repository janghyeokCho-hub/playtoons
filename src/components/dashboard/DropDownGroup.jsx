import React from "react";
import Dropdown from "@/components/dashboard/Dropdown";
import styled from "styled-components";
import { Body1 } from "@/styledMixins";


function DropdownGroup(props) {
  const { children, label, className, dataList } = props;

  return (
    <Container className={`dropdown-group ${className || ""}`}>
      <TextLabel>{label}</TextLabel>
      {
        dataList !== undefined && <Dropdown dataList={dataList} className={className} selected={children} />
      }
    </Container>
  );
}

const Container = styled.div`
  width: 215px;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 85px;

  &.dropdown-group.type {
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

export default DropdownGroup;
