import React, { useImperativeHandle, useState, forwardRef, useEffect } from "react";
import styled from "styled-components";

function ToggleOn(props, ref) {
  const { selected } = props;
  const [isSelected, setSelected] = useState(false);
  
  const handleClick = () => {
    setSelected(!isSelected);
  }

  useImperativeHandle(ref, () => {
    return isSelected;
  });

  useEffect(() => {
    if( selected !== undefined ){
      setSelected(selected);
    }
  
  }, []);
  

  return (
    <Container className={`${isSelected && ('select')}`} onClick={handleClick}>
      <Oval className={isSelected !== true && 'margin-right'} ></Oval>
    </Container>
  );
}

const Container = styled.div`
  position: unset;
  height: 31px;
  display: flex;
  padding: 0 3px;
  justify-content: flex-end;
  align-items: center;
  min-width: 56px;
  background-color: var(--gray);
  border-radius: 15.5px;
  
  &.select{
    background-color: var(--violet-blue);
  }

`;

const Oval = styled.div`
  width: 25px;
  height: 25px;
  background-color: var(--white);
  border-radius: 25px;

  &.margin-right {
    margin-right: auto;
  }
`;

export default forwardRef(ToggleOn);
