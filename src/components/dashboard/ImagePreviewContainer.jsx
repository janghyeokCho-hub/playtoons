import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-light-svg-icons";

export default function ImagePreviewContainer(props) {
  const { children : src, handleClick } = props;

  const handleIconCloseClick = () => {
    //클릭 이벤트 구현
    if( handleClick !== undefined ){ handleClick(); }
  }

  return (
    <Container>
      <Img 
        borderRadius={props.borderRadius}
        src={src} />
        <FontAwesomeIcon 
            icon={faCircleXmark}
            onClick={handleIconCloseClick}
            style={{ 
              width: "32px", 
              height:"32px", 
              color: "var(--deep-space-sparkle)",
              backgroundColor: "var(--white)",
              borderRadius: "32px",
              position : "absolute",
              top: "0",
              right: "0",
              transform: "translate(50%, -50%)"
            }}
            />
    </Container>
  )
}

const Container = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  border-radius: ${(props) => props.borderRadius};
`;

