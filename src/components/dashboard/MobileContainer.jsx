import React from "react";
import styled from "styled-components";
import {  } from "@/styledMixins";

function MobileContainer(props) {

  return (
    <Container >
      {props.children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  font-size: 10px;
`;


export default MobileContainer;
