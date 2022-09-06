import React from "react";
import styled from "styled-components";
import { Body2, Body5 } from "@/styledMixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHouseChimneyWindow,
  faInfinity,
  faStars,
} from "@fortawesome/pro-light-svg-icons";

const LeftSideMenu = () => {
  const menus1 = [
    {
      icon: faHouseChimneyWindow,
      name: "探索",
    },
    {
      icon: faInfinity,
      name: "タイムライン",
    },
  ];

  const menus2 = [
    {
      icon: faStars,
      name: "クリエイターリスト",
    },
    {
      icon: faCartShopping,
      name: "マケットプレイス",
    },
  ];
  return (
    <LeftSideMenuDiv>
      <ClassDiv>
        <ClassNameDiv>探索</ClassNameDiv>
        {menus1.map((item, index) => {
          return (
            <ClassMenuDiv key={`${item.name}_${index}`}>
              <ClassMenuIconDiv>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ width: "100%", height: "100%" }}
                />
              </ClassMenuIconDiv>
              <ClassMenuNameDiv>{item.name}</ClassMenuNameDiv>
            </ClassMenuDiv>
          );
        })}
      </ClassDiv>

      <RectangleCopy168 />

      <ClassDiv>
        <ClassNameDiv>創作</ClassNameDiv>
        {menus2.map((item, index) => {
          return (
            <ClassMenuDiv key={`${item.name}_${index}`}>
              <ClassMenuIconDiv>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ width: "100%", height: "100%" }}
                />
              </ClassMenuIconDiv>
              <ClassMenuNameDiv>{item.name}</ClassMenuNameDiv>
            </ClassMenuDiv>
          );
        })}
      </ClassDiv>
    </LeftSideMenuDiv>
  );
};

const LeftSideMenuDiv = styled.div`
  position: absolute;
  width: 300px;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-right: 1.2px solid #00000080;
`;

const ClassDiv = styled.div`
  margin: 1em;
`;

const ClassNameDiv = styled.div`
  ${Body5}
  width: 100%;
  min-height: 16px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 16px;
  white-space: nowrap;
`;

const ClassMenuDiv = styled.div`
  flex-direction: row;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 1em;
`;

const ClassMenuIconDiv = styled.div`
  width: 24px;
  height: 21px;
  margin-top: 0.5em;
  margin-left: 1em;
  margin-bottom: 1em;
`;

const ClassMenuNameDiv = styled.div`
  ${Body2}
  margin-top: 0.5em;
  margin-left: 1em;
  margin-bottom: 1em;
  min-height: 20px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const RectangleCopy168 = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mercury);
`;

export default LeftSideMenu;
