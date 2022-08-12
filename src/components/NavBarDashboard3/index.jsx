import React from "react";
import NavBarDashboardPostOff from "../NavBarDashboardPostOff";
import DashboardProfileNavBarOff from "../DashboardProfileNavBarOff";
import NavBarDashboardPlanOff from "../NavBarDashboardPlanOff";
import NavBar from "../NavBar";
import DashboardItemNavBarOff from "../DashboardItemNavBarOff";
import styled from "styled-components";
import { Body5 } from "@/styledMixins";
import iconSquarePen from '@ICONS/dashboardreactionlist-path-square-pen.png';
import iconPencil from '@ICONS/mauthorpost-shape-pencil.png';
import iconDoubeRect from '@ICONS/dashboard-shape-double-rect.png';
import iconRhombus from '@ICONS/dashboard-shape-rhombus.png';

function NavBarDashboard3(props) {
  return (
    <NavBarDashboard>
      <OverlapGroup>
        <Rectangle></Rectangle>
        <NavBarDashboardPostOff
          icoSquarePenLight={iconSquarePen}
          txtNavDashboardOn="支援管理"
          className="dashboardseries_nav_support"
        />
        <NavBarDashboardPostOff
          icoSquarePenLight={iconPencil}
          txtNavDashboardOn="投稿管理"
          className="nav_bar_dashboard_post_off-5"
        />
        <DashboardProfileNavBarOff />
        <NavBarDashboardPlanOff
          icoSealSolid={iconDoubeRect}
          txtNavDashboardOn="シリーズ管理"
        />
        <NavBar />
        <DashboardItemNavBarOff
          icoDiamondLight={iconRhombus}
          txtNavDashboardOn="商品"
        />
        <TxtNavTit>ダッシュボード</TxtNavTit>
      </OverlapGroup>
    </NavBarDashboard>
  );
}

const NavBarDashboard = styled.div`
  position: absolute;
  height: 1000px;
  top: 100px;
  left: 0;
  display: flex;
  align-items: flex-start;
  min-width: 301px;
`;

const OverlapGroup = styled.div`
  width: 301px;
  height: 1000px;
  position: relative;
`;

const Rectangle = styled.div`
  position: absolute;
  width: 300px;
  height: 1000px;
  top: 0;
  left: 1px;
  background-color: var(--white);
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
