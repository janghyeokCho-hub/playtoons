import React from 'react';
import styled from "styled-components";

export default function Space(props) {
  return (
    <Container height={props.height} />
  )
}

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
`;