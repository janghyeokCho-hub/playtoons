import React, {useRef} from 'react';
import styled from "styled-components";

import iconClose from '@ICONS/icon_circle_close.png';

export default function ImagePreviewContainer(props) {
  const { children : src, handleClick } = props;
  const refContainer = useRef();

  const handleIconCloseClick = () => {
    //클릭 이벤트 구현
    if( handleClick !== undefined ){ handleClick(); }
    
    // refContainer.current.parentNode.removeChild(refContainer.current);
  }

  return (
    <Container ref={refContainer}>
      <Img src={src} />
      <IconClose onClick={handleIconCloseClick}></IconClose>
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
`;

const IconClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  width: 32px;
  height: 32px;
  background-color: var(--white);
  border-radius: 32px;
  background-size: 100% 100%;
  background-image: url(${iconClose});
`;
