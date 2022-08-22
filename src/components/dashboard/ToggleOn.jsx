import React, { useImperativeHandle, useState, forwardRef, useEffect } from "react";
import styled from "styled-components";

function ToggleOn(props, ref) {
  const { className, selected } = props;
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
  
    return () => {
    }
  }, []);
  

  return (
    <Container className={`group-6-16 ${className || ""} ${isSelected && ('select')}`} onClick={handleClick}>
      <Oval className={isSelected === true ? 'oval-11' :  'oval-11 select'} ></Oval>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 31px;
  top: 957px;
  left: 762px;
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

  &.group-6-16.group-3-22 {
    position: unset;
    top: unset;
    left: unset;
  }
`;

const Oval = styled.div`
  width: 25px;
  height: 25px;
  background-color: var(--white);
  border-radius: 25px;

  &.select {
    margin-right: 25px;
  }
`;

export default forwardRef(ToggleOn);
