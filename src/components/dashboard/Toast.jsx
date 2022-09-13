import React from 'react';
import styled from 'styled-components';

export default function Toast(props) {
  const { title, text, type } = props;
  const containerPadding = text ? "14px 16px 12px 16px" : "14px 16px 14px 16px";

  return (
    <div>Toast</div>
  )
}

const Container = styled.div`
  width: 400px;
  padding: ${(props) => props.padding};
  border-radius: 4px;
  border: 1px solid var(--violet-blue);
  background-color: var(--selago);
`;