import React from "react";
import styled from "styled-components";
import { Border1pxTiara } from "@/styledMixins";
import iconDown from '@ICONS/icon_down.png'


function Group34(props) {
  const { dataList, dropdownClassName } = props;

  const getLiElements = () => {
    return dataList.map((data, index) => {
      return <Li key={index}>{data}</Li>;
    });
  }

  return (
    <Ul className={`group-3-24 ${dropdownClassName || ""}`}>
      <Path className="path-9" src={iconDown} />
      {
        dataList !== undefined && ( getLiElements() )
      }
    </Ul>
  );
}

const Li = styled.li`
  width: 215px;
  height: 45px;
  padding: 18px 17px;
  margin: 0;
  list-style: none;
  display:none;
  position: absolute;
  font-size:14px;
  background: skyblue;
`;

const Ul = styled.ul`
  ${Border1pxTiara}
  width: 215px;
  height: 45px;
  margin-top: 20px;
  display: flex;
  padding: 18px 17px;
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

const Path = styled.img`
  width: 12px;
  height: 7px;
`;

export default Group34;
