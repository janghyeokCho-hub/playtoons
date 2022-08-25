import React from "react";
import styled from "styled-components";
import { Body5 } from "@/styledMixins";

import NavBarItem from '@COMPONENTS/dashboard/NavBarItem';

import iconSquarePen from '@ICONS/dashboardreactionlist-path-square-pen.png';
import iconPencil from '@ICONS/mauthorpost-shape-pencil.png';
import iconDoubeRect from '@ICONS/dashboard-shape-double-rect.png';
import iconRhombus from '@ICONS/dashboard-shape-rhombus.png';
import iconDashboard from '@ICONS/dashboardseries-shape-dashboard.png';
import iconPorfile from '@ICONS/dashboardeditplan-shape.png';

const onClickSupport = () => {
  console.log("move to support management page");
}

const onClickProduct = () => {
  console.log("move to Product page");
}

const onClickSerise = () => {
  console.log("move to Serise management page");
}

const onClickPost = () => {
  console.log("move to post management page");
}

const onClickProfile = () => {
  console.log("move to Profile management page");
}

const onClickDashboard = () => {
  console.log("move to Dashboard management page");
}

function NavBarDashboard3(props) {

  let top = 50;

  return (
    <NavBarDashboard>
      <NavBarItem top={top*6} onClick={onClickSupport} icon={iconSquarePen} selectedIcon={iconSquarePen} text={"支援管理"} />
      <NavBarItem top={top*5} onClick={onClickPost} icon={iconPencil} selectedIcon={iconPencil}  text={"投稿管理"} />
      <NavBarItem top={top*4} onClick={onClickSerise} icon={iconDoubeRect} selectedIcon={iconDoubeRect}  text={"シリーズ管理"} />
      <NavBarItem top={top*3} onClick={onClickProfile} icon={iconPorfile} selectedIcon={iconPorfile}  text={"プロフィル管理"} />
      <NavBarItem top={top*2} onClick={onClickProduct} icon={iconRhombus} selectedIcon={iconRhombus}  text={"商品"} />
      <NavBarItem top={top} onClick={onClickDashboard} icon={iconDashboard} selectedIcon={iconDashboard}  text={"ダッシュボード"} />
      <TxtNavTit>ダッシュボード</TxtNavTit>
    </NavBarDashboard>
  );
}

const NavBarDashboard = styled.div`
  width: 300px;
  max-width: 300px;
  position: relative;
  flex: 1;
`;

const TxtNavTit = styled.div`
  ${Body5}
  position: absolute;
  top: 20px;
  left: 33px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 16px;
  white-space: nowrap;
`;

export default NavBarDashboard3;
