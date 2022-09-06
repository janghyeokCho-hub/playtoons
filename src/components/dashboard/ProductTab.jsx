import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Body1 } from "@/styledMixins";

export default function ProductTab(props) {
  const { tabs, path } = props;
  const [selectedPath, setSelectedPath] = useState();

  useEffect(() => {
    setSelectedPath(path);
  }, []);

  return (
    <Container marginBottom={props.marginBottom}>
      <FlexContainer>
        <TextContainer>
          <TitleText className={`${selectedPath === tabs.see_product && "selected" }`}>{tabs.see_product}</TitleText>
          {
            selectedPath === tabs.see_product && <SelectedLine />
          }
        </TextContainer>
        <TextContainer>
          <TitleText className={`${selectedPath === tabs.sales_detail && "selected" }`}>{tabs.sales_detail}</TitleText>
          {
            selectedPath === tabs.sales_detail && <SelectedLine />
          }
        </TextContainer>
        <TextContainer>
          <TitleText className={`${selectedPath === tabs.qna_product && "selected" }`}>{tabs.qna_product}</TitleText>
          {
            selectedPath === tabs.qna_product && <SelectedLine />
          }
        </TextContainer>
        <TextContainer>
          <TitleText className={`${selectedPath === tabs.see_review && "selected" }`}>{tabs.see_review}</TitleText>
          {
            selectedPath === tabs.see_review && <SelectedLine />
          }
        </TextContainer>
      </FlexContainer>
      <HorizontalLine />
    </Container>
  )
}

const TextContainer = styled.div`
  margin-right: 30px;
`;


const FlexContainer = styled.div`
  margin-top: 63px;
  margin-left: 55px;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.marginBottom}
`;

const SelectedLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--violet-blue);
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mercury);
`;

const TitleText = styled.div`
  ${Body1}
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 1.6em;
  letter-spacing: 1;
  color : var(--manatee);
  
  &.selected{
    color : var(--violet-blue);
  }
`;
