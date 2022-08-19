import React, { useState } from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import iconDown from '@ICONS/icon_down.png'

function Dropdown(props) {
  const { dataList, className} = props;
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setOpen(!isOpen);

  const handleOptionClicked = value => () => {
    setSelectedOption(value);
    setOpen(false);
    console.log(selectedOption);
  };

  const getLiElements = () => {
    return dataList.map((data, index) => {
      return <ListItem key={index} onClick={handleOptionClicked(data)}>{data}</ListItem>;
    });
  }

  return (
      <DropDownContainer onClick={handleToggle} className={`group-3-24 ${className || "" }`}>
        <Path className="path-9" src={iconDown} />
        <DropDownHeader>{selectedOption}</DropDownHeader>
        {
          isOpen === true && (
            <DropDownListContainer>
              <DropDownList>
                {
                  dataList !== undefined && ( getLiElements() )
                }
              </DropDownList>
            </DropDownListContainer>
          )
        }
      </DropDownContainer>
      
  );
}

const DropDownContainer = styled.div`
  ${Border1pxTiara}
  width: 215px;
  height: 45px;
  padding-left: 18px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 5px;

    &.group-3-24.group-3-25 {
      position: absolute;
      top: 244px;
      left: 350px;
      margin-top: unset;
    }

    &.group-3-24.group-3-26 {
      border-radius: 4px;
    }

    &.group-3-24.group-3-27 {
      border-radius: 4px;
    }

    &.group-3-24.group-3-28 {
      border-radius: 4px;
    }

    &.group-3-24.group-3-29 {
      border-radius: 4px;
    }

    &.group-3-24.group-3-30 {
      border-radius: 4px;
    }

    &.group-3-24.group-3-31 {
      border-radius: 4px;
    }
`;

const DropDownHeader = styled.div`
  width: 215px;
  height: 45px;
  padding: 13px;
  margin-bottom: 0.8em;
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  text-align: center;
  position: absolute;
`;

const DropDownListContainer = styled.div`
  margin-top: 45px;
  z-index: 50;
`;

const DropDownList = styled.ul`
  width: 215px;
  height: 45px;
  padding: 0;
  margin: 0;
  background: #ffffff;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.8em;
  text-align: center;
  list-style: none;
  background: #ffffff;
`;


const Path = styled.img`
  width: 12px;
  height: 7px;
  position: absolute;
  margin: 18px;
`;

export default Dropdown;
