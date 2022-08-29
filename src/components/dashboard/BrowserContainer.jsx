import React from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import verticalLine from "@LINES/dashboardeditseries-line-2.png";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";

/**
* 대시보드 pc 용 공통 백그라운드
*
* @version 1.0.0
* @author 이현국
* @props 적재할 제품이며, null 값은 안됨.
*/
function SeriesContainer(props) {
  const {children, backgroundColor = "transparent", isBorder} = props;
  

  return (
    <DashboardSeriesContainer className="screen">
      {/* <HorizontalLine src={horizontalLine} /> */}
      <Container >
        <NavBarDashboard {...props}/>
        <Line src={verticalLine} />
        <ContentContainer backgroundColor={backgroundColor}>
          <Space width={props.spaceWidth}/>
          <ContentWrapContainer padding={props.padding}>
            <ContentWhiteBorderContainer isBorder={isBorder}>
              {children}
            </ContentWhiteBorderContainer>
          </ContentWrapContainer>
          <Space width={props.spaceWidth}/>
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

//inset 0px 2px 20px -10px #00000080
const ContentContainer = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  background-color: ${(props) => props.backgroundColor};
  font-size: 10px;
  box-shadow: inset 0 2px 9px -7px #00000080;
  
    @media only screen and (max-width: 1025px) {
      font-size: 8px;
    }
  
    @media only screen and (max-width: 768px) {
      font-size: 6px;
    }
  `;

const ContentWrapContainer = styled.div`
  min-width: 500px;
  padding: ${(props) => props.padding === undefined ? '7.454739084132055vh 0' : props.padding};
  flex: 15;
  
    @media only screen and (max-width: 1025px) {
      flex: 25;
    }
  
`;

const ContentWhiteBorderContainer = styled.div`
  ${(props) => props.isBorder ? Border1pxTiara : ''}
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.isBorder ? 'var(--white)' : 'transparent'};;
  border-radius: ${(props) => props.isBorder ? 8 : 0}px;
`;

const Space = styled.div` 
  width: ${(props) => props.width === undefined ? '2.027027027027027vw' : props.width};
`;

export default SeriesContainer;
