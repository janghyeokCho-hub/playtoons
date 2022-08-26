import React from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import verticalLine from "@LINES/dashboardeditseries-line-2.png";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";


function SeriesContainer(props) {
  const {children, backgroundColor = "transparent", isBorder} = props;
  

  return (
    <DashboardSeriesContainer className="screen">
      {/* <HorizontalLine src={horizontalLine} /> */}
      <Container >
        <NavBarDashboard />
        <Line src={verticalLine} />
        <ContentContainer backgroundColor={backgroundColor}>
          <Space />
          <ContentWrapContainer>
            <ContentWhiteBorderContainer isBorder={isBorder}>
              {children}
            </ContentWhiteBorderContainer>
          </ContentWrapContainer>
          <Space/>
        </ContentContainer>
      </Container>
    </DashboardSeriesContainer>
  );
}

const DashboardSeriesContainer = styled.div`
  width: 100%;
  background-color: var(--white);
`;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const VerticalLine = styled.img`
  width: 1px;
  height: 92vh;
`;

const Line = styled.div`
  width: 1px;
  height: auto;
  background-color: var(--mercury);
`;

const ContentContainer = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  background-color: ${(props) => props.backgroundColor};
  font-size: 10px;
  
    @media only screen and (max-width: 1025px) {
      font-size: 8px;
    }
  
    @media only screen and (max-width: 768px) {
      font-size: 6px;
    }
  `;

const ContentWrapContainer = styled.div`
  min-width: 500px;
  padding: 7.454739084132055vh 0;
  flex: 15;
  
    @media only screen and (max-width: 1025px) {
      flex: 25;
    }
  
`;

const ContentWhiteBorderContainer = styled.div`
  ${(props) => props.isBorder ? Border1pxTiara : ''}
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border-radius: ${(props) => props.isBorder ? 8 : 0}px;
`;

const Space = styled.div` 
  width: 2.027027027027027vw;
`;

export default SeriesContainer;
