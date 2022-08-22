import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import iconDown from '@ICONS/icon_down.png'

function Dropdown(props) {
  const { dataList, className, selected} = props;
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setShowDropdown(!isShowDropdown);

  const handleOptionClicked = value => () => {
    setSelectedOption(value);
    setShowDropdown(false);
  };

  const getLiElements = () => {
    return dataList.map((data, index) => {
      return <ListItem key={index} onClick={handleOptionClicked(data)}>{data}</ListItem>;
    });
  }

  useEffect(() => {
    if( selected !== undefined ){

      const selectedItem = dataList.map((data, index) => {
        return selected === data && data;
      });

      setSelectedOption(selectedItem);
    }
  
    return () => {
    }
  }, []);
  
  return (
      <DropDownContainer onClick={selected === undefined ? handleToggle : null} className={`dropdown ${className || "" }`}>
        <Path className="path-9" src={iconDown} />
        <DropDownHeader className={`${className || "" }`}>{selectedOption}</DropDownHeader>
        {
          isShowDropdown === true && (
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
  
  &.dropdown.type {
    border-radius: 4px;
  }
  
  &.dropdown.category {
    border-radius: 4px;
  }

  &.disabled{
    background-color: var(--tiara);
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

  &.disabled{
    color: var(--manatee);
  }
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
  height: 45px;
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
