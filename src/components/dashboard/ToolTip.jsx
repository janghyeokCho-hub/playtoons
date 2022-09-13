import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
import { Body2 } from '@/styledMixins';
import { useState } from 'react';
import { useEffect } from 'react';


/**
*
  <ToolTip 
    title={"Title"} 
    text={"text something123142"}
    handleClick={handleClickEvent} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function ToolTip(props) {
  const {title, text, handleClick} = props;
  const [isShow, setShow] = useState(false);

  const onClick = (e) => {
    handleClick?.(e);
    setShow(prev => !prev);
  }

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  return (
    <Container onClick={onClick}>
      {
        isShow && 
        <PopupContainer>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </PopupContainer>
      }
      <FontAwesomeIcon 
        icon={faCircleInfo}
        style={{ 
          width: "16px", 
          height: "16px", 
          color: "var(--deep-space-sparkle)" 
        }}
        />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`;

const PopupContainer = styled.div`
  width: 282px;
  min-height: 78px;
  margin-bottom: 8px;
  padding: 16px 16px 14px 16px;
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: 0px 2px 10px rgba(58,67,77, 0.16);
  z-index: 1000;
  position: absolute;
  top: -8px;
  transform: translate(-50%, -100%);
`;

const Title = styled.div`
  ${Body2}
  margin-bottom: 8px;
  font-size: 1.6em;
  font-weight: 500;
  color: var(--vulcan);
`;

const Text = styled.div`
  ${Body2}
  max-width: 250px;
  font-size: 1.4em;
  font-weight: 500;
  color: var(--deep-space-sparkle);
`;
