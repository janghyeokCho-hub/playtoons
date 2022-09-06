import React from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import verticalLine from "@LINES/dashboardeditseries-line-2.png";
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import {BROWSER_CONTENTS_AREA_TYPE} from '@COMMON/constant';

/**
* 대시보드 pc 용 공통 백그라운드
*
* @version 1.0.0
* @author 이현국
* @props 적재할 제품이며, null 값은 안됨.
*/
export default  function BrowserContainer(props) {
  const {children, backgroundColor = "transparent", type} = props;
  const getContainer = () => {
    switch(type){
      default:
        return ( 
          <BackgroundContainer className="screen">
            <FlexContainer >
              <Space width={props.spaceWidth}/>
                {children}
              <Space width={props.spaceWidth}/>
            </FlexContainer>
          </BackgroundContainer>
        )
      case BROWSER_CONTENTS_AREA_TYPE.DASHBOARD:
        return (
          <BackgroundContainer className="screen">
            <FlexContainer >
              <NavBarDashboard {...props}/>
              <Line src={verticalLine} />
              <ContentContainer backgroundColor={backgroundColor}>
                <Space width={props.spaceWidth}/>
                <ContentWrapContainer padding={props.padding}>
                    {children}
                </ContentWrapContainer>
                <Space width={props.spaceWidth}/>
              </ContentContainer>
            </FlexContainer>
          </BackgroundContainer>
        )
      case BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITH_WHITE_BOX:
        return (
          <BackgroundContainer className="screen">
            {/* <HorizontalLine src={horizontalLine} /> */}
            <FlexContainer >
              <NavBarDashboard {...props}/>
              <Line src={verticalLine} />
              <ContentContainer backgroundColor={backgroundColor}>
                <Space width={props.spaceWidth}/>
                <ContentWrapContainer padding={props.padding}>
                  <ContentWhiteBorderContainer>
                    {children}
                  </ContentWhiteBorderContainer>
                </ContentWrapContainer>
                <Space width={props.spaceWidth}/>
              </ContentContainer>
            </FlexContainer>
          </BackgroundContainer>
        )
      
      case BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITHOUT_PADDING:
        return (
          <BackgroundContainer className="screen">
            {/* <HorizontalLine src={horizontalLine} /> */}
            <FlexContainer >
              <NavBarDashboard {...props}/>
              <Line src={verticalLine} />
              <ContentContainer display={props.display} backgroundColor={backgroundColor}>
                    {children}
              </ContentContainer>
            </FlexContainer>
          </BackgroundContainer>
        )
      
    }
  }

  return (
    getContainer()
  );
}

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 180px);  //topbar 100px, footer 80px
  background-color: var(--white);
`;

const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
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
  display: ${(props) => props.display ? props.display : "flex"};
  background-color: ${(props) => props.backgroundColor};
  font-size: 10px;
  box-shadow: inset 0 2px 9px -7px #00000080;
  
    @media only screen and (max-width: 1200px) {
      font-size: 8px;
    }
  
  `;

const ContentWrapContainer = styled.div`
  padding: ${(props) => props.padding === undefined ? '7.454739084132055vh 0' : props.padding};
  flex: 15;
  
    @media only screen and (max-width: 1200px) {
      flex: 25;
    }
  
`;

const ContentWhiteBorderContainer = styled.div`
  ${Border1pxTiara}
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border-radius: 8px;
`;

const Space = styled.div` 
  width: ${(props) => props.width === undefined ? '2.027027027027027vw' : props.width};

  @media only screen and (max-width: 1200px) {
      width: 20px;
    }
`;


