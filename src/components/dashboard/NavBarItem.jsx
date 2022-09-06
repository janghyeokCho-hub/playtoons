import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Body2 } from "@/styledMixins";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBarItem(props) {
  const { icon, selectedIcon, text, top, left = 30, onClick, name } = props;
  const [isSelected, setSelected] = useState(false);
  const location = useLocation();
  

  const handleClick = (e) => {
    // setSelected(!isSelected);

    if (onClick !== undefined) {
      onClick(e);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    if( path.indexOf(name) !== -1  ){
      setSelected(true);
    }
  }, []);
  

  return (
    <Container
      top={top}
      left={left}
      onClick={handleClick}
      className={`${isSelected ? "selected" : ""}`}
      >
      <FontAwesomeIcon 
            icon={isSelected ? selectedIcon : icon}
            style={{ width: "24px", height: "24px", marginRight: "20px", color: `${isSelected ? "var(--violet-blue)" : "var(--black)"}` }}
            />
      <TextLabel 
        className={`${isSelected ? "selected" : ""}`}
        >
        {text}
      </TextLabel>
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

  &.selected {
    background-color: var(--primary-c01);
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
  cursor: default;

  &.selected {
    color: var(--primary-c11);
  }
`;

