import React from "react";
import styled from "styled-components";
import { Border1pxTiara, Body5 } from "@/styledMixins";

import PageTitle from '@/components/dashboard/PageTitleMobile';

function MobileContainer(props) {

  return (
    <Container {...props} className="container-center-horizontal" >
      {
        props.pageTitle !== undefined && (<PageTitle pageTitle={props.pageTitle} handleClick={props.onClickBack} />)
      }
      {
        props.isBorder === true ? (
          <ContentContainer>

            <WhiteBorderWrapContainer {...props}>
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

const ContentContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  padding: ${(props) => props.padding ? props.padding : ""};
  background-color: var(--white);
  overflow-x: hidden;
  font-size: 10px;
`;

const WhiteBorderWrapContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px; 
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "var(--desert-storm)"};
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
