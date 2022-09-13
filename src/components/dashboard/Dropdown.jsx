import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Border1pxTiara, Body4, Body7 } from "@/styledMixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";

/**
* Dropdown 리스트를 만든다
* ex) 
      const dataList = [
        "1", "2", "3"
      ];
      <Dropdown dataList={dataList} className={"disabled"} selected={"1"} />
* @version 1.0.0
* @author 이현국
* @param dataList 아이템 리스트
* @param className 스타일
* @param selected 선택된 아이템
*/
function Dropdown(props) {
  const { dataList, selected } = props;
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    if (dataList !== undefined) {
      setShowDropdown(!isShowDropdown);
    }
  };

  const handleOptionClicked = (value) => () => {
    setSelectedOption(value);
    setShowDropdown(false);

    if (props.handleItemClick !== null && props.handleItemClick !== undefined) {
      props.handleItemClick(value);
    }
  };

  const getLiElements = (props) => {
    return dataList.map((data, index) => {
      return (
        <ListItem key={index} {...props} onClick={handleOptionClicked(data)}>
          {data}
        </ListItem>
      );
    });
  };

  useEffect(() => {
    //초기값 셋팅
    if (selected !== undefined) {
      const selectedItem = dataList.map((data, index) => {
        return selected === data && data;
      });

      setSelectedOption(selectedItem);
    }

    return () => {};
  }, []);

  return (
    <DropDownContainer 
      {...props}
      onClick={handleToggle} 
      >
      <FontAwesomeIcon
        icon={faChevronDown}
        style={{
          width: "12px",
          height: "7px",
          color: "var(--deep-space-sparkle)",
          position: "absolute",
          top: "19px",
          right: "16px"
        }}
      />
      <DropDownHeader {...props}>{selectedOption}</DropDownHeader>
      {isShowDropdown === true && (
        <DropDownListContainer {...props}>
          <DropDownList {...props}>
            {dataList !== undefined && getLiElements(props)}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  ${Border1pxTiara}
  width: ${(props) => props.width}; //215
  height: ${(props) => props.height}; //45
  padding-left: ${(props) => props.paddingLeft};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-right: ${(props) => props.marginRight};
  background-color: ${(props) => props.backgroundColor}; //var(--white)
  border-radius: ${(props) => props.borderRadius}; //5
  align-items: flex-start;
  position: relative;

  &.type {
    border-radius: 4px;
  }

  &.category {
    border-radius: 4px;
  }

  &.disabled {
    background-color: var(--tiara);
  }
`;

const DropDownHeader = styled.div`
  width: ${(props) => props.width};
  font-weight: 500;
  font-size: 1.4em;
  color: var(--vulcan);
  white-space: nowrap;
  position: absolute;
  left: 18px;
  //세로정렬
  top: 50%;
  transform: translate(0, -50%);

  &.disabled {
    color: var(--manatee);
  }
  &.post_detail {
    ${Body4}
    font-weight: 700;
  }
  &.post_detail_mobile {
    ${Body7}
    left: 8px;
  }
`;

const DropDownListContainer = styled.div`
  margin-top: ${(props) => props.height};
  z-index: 50;
  position: absolute;
`;

const DropDownList = styled.ul`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0;
  margin: 0;
  background: #ffffff;
  box-sizing: border-box;
  color: var(--vulcan);
  font-size: 1.4em;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  &.post_detail {
    ${Body4}
    font-weight: 700;
    white-space: nowrap;
  }
`;

const ListItem = styled.li`
  height: ${(props) => props.height};
  text-align: center;
  list-style: none;
  background: #ffffff;
  color: var(--vulcan);
  white-space: nowrap;
  &.post_detail {
    ${Body4}
    font-weight: 700;
  }
  &.post_detail_mobile {
    ${Body7};
  }
`;

const Path = styled.img`
  width: 12px;
  height: 7px;
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translate(0, -50%);
  &.post_detail {
    right: 18px;
  }
  &.post_detail_mobile {
    width: 10px;
    height: 5.83px;
    right: 8px;
  }
`;

export default Dropdown;
