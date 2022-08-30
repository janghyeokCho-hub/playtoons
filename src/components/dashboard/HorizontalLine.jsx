import React from 'react';
import styled from "styled-components";

export default function HorizontalLine(props) {
  const {height = "1px", marginTop, marginBottom} = props;

  return (
    <Container height={height} marginTop={marginTop} marginBottom={marginBottom} />
  )
}

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  background-color: var(--mercury);
`;