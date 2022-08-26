import React from "react";
import styled from "styled-components";
import { Border1pxTiara, Body5 } from "@/styledMixins";

import iconArrowLeft from '@ICONS/icon_arrow_left_black_mobile.png';

function MobileContainer(props) {

  return (
    <Container className="container-center-horizontal" >
      {
        props.isBorder === true ? (
          <ContentContainer>
            <HorizontalLine/>
            <PageTitleContainer>
              <IconArrowLeft src={iconArrowLeft} /> 
              <PageTitle>{props.pageTitle}</PageTitle>
            </PageTitleContainer>
            <HorizontalLine/>

            <WhiteBorderWrapContainer>
              <WhiteBorderContainer>
                  {props.children}
              </WhiteBorderContainer>
            </WhiteBorderWrapContainer>
          </ContentContainer>
        ) : 
        (
          props.children
        )
      }
    </Container>
  );
}

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mercury);
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const PageTitle = styled.div`
  ${Body5}
  min-height: 16px;
  font-weight: 500;
  color: var(--deep-space-sparkle);
  line-height: 16px;
  white-space: nowrap;
`;

const IconArrowLeft = styled.img`
  width: 9px;
  height: 16px;
  margin-right: 10px;
`;

const PageTitleContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background-color: var(--white);
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  background-color: var(--white);
  overflow-x: hidden;
  font-size: 10px;
`;

const WhiteBorderWrapContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px; 
  background-color: var(--desert-storm);
`;

const WhiteBorderContainer = styled.div`
  ${Border1pxTiara}
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--white);
  border-radius: 4px;
`;


export default MobileContainer;
