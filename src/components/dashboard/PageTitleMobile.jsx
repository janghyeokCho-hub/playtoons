import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Body5 } from "@/styledMixins";

import iconArrowLeft from '@ICONS/icon_arrow_left_black_mobile.png';

export default function PageTitle(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if( props.handleClick !== undefined ){ props.handleClick() }
    
    navigate(-1);
  };

  return (
    <Container>
      <HorizontalLine/>
      <PageTitleContainer>
        <IconArrowLeft src={iconArrowLeft} onClick={handleClick} /> 
        <Title>{props.pageTitle}</Title>
      </PageTitleContainer>
      <HorizontalLine/>
    </Container>
  )
}

const Container = styled.div`

`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mercury);
`;

const Title = styled.div`
  ${Body5}
  min-height: 16px;
  font-weight: 500;
  color: var(--deep-space-sparkle);
  line-height: 16px;
  white-space: nowrap;
`;

const IconArrowLeft = styled.img`
  width: 9px;
  height: 16px;
  margin-right: 8px;
`;

const PageTitleContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background-color: var(--white);
  display: flex;
  align-items: center;
`;