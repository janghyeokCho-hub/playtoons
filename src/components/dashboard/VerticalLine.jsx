import React from 'react';
import styled from "styled-components";

export default function VerticalLine(props) {
  const {height = 1, marginTop, marginBottom} = props;

  return (
    <Container height={height} marginTop={marginTop} marginBottom={marginBottom} />
  )
}

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.marginTop}px;
  margin-bottom: ${(props) => props.marginBottom}px;
  background-color: var(--mercury);
`;