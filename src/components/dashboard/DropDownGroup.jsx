import React from "react";
import Dropdown from "@/components/dashboard/Dropdown";
import styled from "styled-components";
import { Body1 } from "@/styledMixins";


function DropdownGroup(props) {
  const { label, dataList } = props;

  return (
    <Container {...props}>
      <TextLabel {...props}>{label}</TextLabel>
      {
        dataList !== undefined && <Dropdown 
                                    {...props}
                                    width={"215px"}
                                    height={"45px"}
                                    marginTop={"20px"}
                                    borderRadius={"5px"}
                                    backgroundColor={"var(--white)"} />
      }
    </Container>
  );
}

const Container = styled.div`
  width: 215px;
  min-height: 85px;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  &.upload_series {
    
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
