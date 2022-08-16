import React from "react";
import styled from "styled-components";
import { Body5, Body2 } from "@/styledMixins";

import NavBarDashboardPostOff from "../NavBarDashboardPostOff";
import NavBarDashboardPlanOff from "../NavBarDashboardPlanOff";
import DashboardItemNavBarOff from "../DashboardItemNavBarOff";

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
  return (
    <NavBarDashboard>
      <OverlapGroup>
        <Rectangle></Rectangle>
        <NavBarSupport
          icoSquarePenLight={iconSquarePen}
          txtNavDashboardOn="支援管理"
          className="dashboardseries_nav_support"
          onClick={onClickSupport}
          />
        <NavBarDashboardPostOff
          icoSquarePenLight={iconPencil}
          txtNavDashboardOn="投稿管理"
          className="nav_bar_dashboard_post_off-5"
          onClick={onClickPost}
          />
        <DashboardProfileNavBarOff1
          onClick={onClickProfile}>
          <IcoUserLight></IcoUserLight>
          <TxtNavDashboardOn>プロフィル管理</TxtNavDashboardOn>
        </DashboardProfileNavBarOff1>
        <NavBarDashboardPlanOff
          icoSealSolid={iconDoubeRect}
          txtNavDashboardOn="シリーズ管理"
          onClick={onClickSerise}
          />
        <NavBar1
          onClick={onClickDashboard}>
          <IcoTableColumnsLight></IcoTableColumnsLight>
          <TxtNavDashboardOff>ダッシュボード</TxtNavDashboardOff>
        </NavBar1>
        <DashboardItemNavBarOff
          icoDiamondLight={iconRhombus}
          txtNavDashboardOn="商品"
          onClick={onClickProduct}
        />
        <TxtNavTit>ダッシュボード</TxtNavTit>
      </OverlapGroup>
    </NavBarDashboard>
  );
}

const NavBarSupport = styled(NavBarDashboardPostOff)`
  top : 400px;
`;

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

const DashboardProfileNavBarOff1 = styled.div`
  position: absolute;
  height: 24px;
  top: 180px;
  left: 31px;
  display: flex;
  padding: 0 31px;
  align-items: flex-end;
  min-width: 229px;
`;

const IcoUserLight = styled.div`
  width: 21px;
  height: 24px;
  margin-bottom: -12px;
  background-image: url('${iconPorfile}');
  background-size: 100% 100%;
`;

const TxtNavDashboardOn = styled.div`
  ${Body2}
  width: 106px;
  min-height: 20px;
  margin-left: 32px;
  margin-bottom: -10px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const NavBar1 = styled.div`
  position: absolute;
  width: 230px;
  height: 21px;
  top: 70px;
  left: 30px;
  display: flex;
`;

const IcoTableColumnsLight = styled.div`
  /* margin-top: 14px; */
  width: 24px;
  height: 21px;
  margin-left: 30px;
  background-image: url('${iconDashboard}');
  background-size: 100% 100%;
`;

const TxtNavDashboardOff = styled.div`
  ${Body2}
  width: 177px;
  height: 20px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
  margin-left: 35px;
`;

export default NavBarDashboard3;
