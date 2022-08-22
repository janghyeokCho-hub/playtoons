import React, { useState } from "react";
import styled from "styled-components";
import { Body2 } from "@/styledMixins";


function NavBarItem(props) {
  const { icon, selectedIcon, text, top, left = 30, onClick } = props;
  const [isSelected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!isSelected);

    if( onClick !== undefined ){  onClick();  }
  }

  return (
    <Container top={top} left={left} onClick={handleClick} className={`${isSelected ? ('selected') : ''}`}>
      <Icon  className={`${isSelected ? ('selected') : ''}`} icon={icon} selectedIcon={selectedIcon}></Icon>
      <TextLabel className={`${isSelected ? ('selected') : ''}`}>{text}</TextLabel>
    </Container>
  );
}


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  top: ${(props) => props.top}px;
  padding-left: ${(props) => props.left}px;
  display: flex;
  align-items: center;
  background-color: transparent;
  
  &.selected{
      background-color: var(--primary-c01);
    }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background-size: 100% 100%;
  background-image: url(${(props) => props.icon});

  &.selected{
    background-image: url(${(props) => props.selectedIcon});
  }
`;

const TextLabel = styled.div`
  ${Body2}
  width: 107px;
  height: 20px;
  flex: 1;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
  
  &.selected{
    color: var(--primary-c11);
  }
`;


export default NavBarItem;