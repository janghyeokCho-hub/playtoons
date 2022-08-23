import React from "react";
import styled from "styled-components";
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
        <ContentContainer>
          <Space />
          <ContentWrapContainer>
            {props.children}
          </ContentWrapContainer>
          <Space/>
        </ContentContainer>
      </Container>
    </DashboardSeriesContainer>
  );
}

const DashboardSeriesContainer = styled.div`
  width: 100%;
  height: 1512px;
  background-color: var(--white);
`;

const Container = styled.div`
  width: 100%;
  height: 1512px;
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
  height: auto;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  flex: 2;
  display: flex;
`;

const ContentWrapContainer = styled.div`
  min-width: 500px;
  padding-top: 2%;
  flex: 15;
`;

const Space = styled.div` 
  max-width: 200px;
  flex: 1;
`;

export default SeriesContainer;
