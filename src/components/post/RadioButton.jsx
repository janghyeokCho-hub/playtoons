import React, {useRef} from "react";
import styled from "styled-components";
import { Border1pxTiara, Body1 } from "@/styledMixins";


/**
* 제품을 화물선에 싣는다.
  <ToggleButton
    className={`${item.isSelected ? "selected" : ""}`}
    key={index} 
    height={"44px"} 
    marginRight={"16px"}
    borderRadius={"4px"}
    text={item.name}
    dataId={item.code}
    handleClick={handleButtonClick}
    />

*
* @version 1.0.0
* @author 이현국
*/
export default function RadioButton(props) {

  const handleClickContainer = (e) => {
    if( props.handleClick !== undefined ){
      props.handleClick(e);
    }
  };

  return (
    <Container
      {...props}
      data-id={props.dataId}
      onClick={handleClickContainer}
    > 
      <Input
        type="text"
        value={props.dataId}
        name={props.text}
      />
      <Text {...props}>{props.text}</Text>
    </Container>
  );
}

const Input = styled.input`
  display: none;
`;

const Container = styled.div`
  ${Border1pxTiara}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;
  background-color: transparent;

  &.selected {
    padding: 12px 16.5px;
    border: 0;
    background-color: var(--violet-blue);
  }
`;

const Text = styled.div`
  ${Body1}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  color: var(--manatee);

  &.selected {
    ${Body1}
    color: var(--white);
  }
`;
