import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { Border1pxTiara, Body1 } from "@/styledMixins";

import ToggleButton from './RadioButton';
import { faBriefcaseBlank } from '@fortawesome/pro-thin-svg-icons';

/**
* 제품을 화물선에 싣는다.
  <Tpye 
    marginBottom={"2.222222222vh"}
    typeList={typeList}
    />

*
* @version 1.0.0
* @author 이현국
*/
export default function Radio(props) {
  const {itemMarginRight, itemBorderRadius} = props;
  const [list, setList] = useState(props.list);
  const [layout , setLayout] = useState(null);
  const [selected, setSelected] = useState('');

  const handleButtonClick = (e) => {
    const id = e.target.getAttribute("data-id");

    list.forEach((item) => {
      item.isSelected = (item.code === id);
    });
    e.currentTarget.getElementsByTagName("input").checked = true;

    setSelected(id);
    setList(list);
    setLayout(getButton());
  }

  const getSelectedId = () => {
    let selectedId = undefined;

    list.forEach((item) => {
      if( item.isSelected ){ 
        selectedId = item.code;  
        return;
      }
    });

    setSelected(selectedId);
    return selectedId;
  }

  const getButton = () => { 
    return list.map((item, index) => {
        return <RadioContainer
                  className={`${item.isSelected ? "selected" : ""}`}
                  key={index} 
                  marginRight={itemMarginRight}
                  borderRadius={itemBorderRadius}
                  data-id={item.code}
                  onClick={handleButtonClick}
                  > 
                  <Text className={`${item.isSelected ? "selected" : ""}`}>{item.name}</Text>
                  
                </RadioContainer>
    });
  }

  
  useEffect(() => {
    setSelected( getSelectedId() );
    setLayout( getButton() );
  }, []);

  return (
    <Container {...props}>
      { layout }
      <Input
        name={"type"}
        value={selected}
        onChange={getSelectedId}
        />
    </Container>
  )
}

const Input = styled.input`
  display: none;
`;

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  display: flex;
`;

const RadioContainer = styled.div`
  ${Border1pxTiara}
  margin-right: ${(props) => props.marginRight};
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

