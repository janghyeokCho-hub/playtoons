import React from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import horizontalLine from "@LINES/authorplan-line.png";
import verticalLine from "@LINES/dashboardeditseries-line-2.png";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";


function SeriesContainer(props) {
  

  return (
    <DashboardSeriesContainer className="screen">
      <HorizontalLine src={horizontalLine} />
      <Container>
        <NavBarDashboard />
        <VerticalLine src={verticalLine} />
        <ContentContainer backgroundColor={props.backgroundColor}>
          <Space />
          <ContentWrapContainer>
            <ContentWhiteBorderContainer isBorder={props.isBorder}>
              {props.children}
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
  height: 100%;
  background-color: var(--white);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const HorizontalLine = styled.img`
  width: 100%;
  height: 2px;
  position: absolute;
  top: 80px;
`;

const VerticalLine = styled.img`
  width: 2px;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 2;
  display: flex;
  background-color: ${(props) => props.backgroundColor};
`;

const ContentWrapContainer = styled.div`
  min-width: 500px;
  padding: 4% 0;
  flex: 15;
  
`;

const ContentWhiteBorderContainer = styled.div`
  ${(props) => props.isBorder ? Border1pxTiara : ''}
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border-radius: ${(props) => props.isBorder ? 8 : 0}px;
  
`;

const Space = styled.div` 
  max-width: 200px;
  flex: 1;
`;

export default SeriesContainer;
