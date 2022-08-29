import React from "react";
import styled from "styled-components";
import { Body5 } from "@/styledMixins";

import NavBarItem from '@COMPONENTS/dashboard/NavBarItem';

import iconSupport from '@ICONS/icon_support.png';
import iconContribution from '@ICONS/icon_contribution.png';
import iconSeriesManagement from '@ICONS/icon_series_management.png';
import iconProduct from '@ICONS/icon_product.png';
import iconDashboard from '@ICONS/icon_dashboard.png';
import iconPorfile from '@ICONS/icon_profile.png';
import iconAnalysis from '@ICONS/icon_analysis.png';


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

const onClickAnalysis = () => {
  console.log("move to onClickAnalysis ");
}

function NavBarDashboard3(props) {

  let top = 50;

  return (
    <NavBarDashboard width={300}>
      {
        props.isAnalysis && ( <NavBarItem top={top*7} onClick={onClickAnalysis} icon={iconAnalysis} selectedIcon={iconAnalysis} text={"分析"} /> )
      }
      <NavBarItem top={top*6} onClick={onClickSupport} icon={iconSupport} selectedIcon={iconSupport} text={"支援管理"} />
      <NavBarItem top={top*5} onClick={onClickPost} icon={iconContribution} selectedIcon={iconContribution}  text={"投稿管理"} />
      <NavBarItem top={top*4} onClick={onClickSerise} icon={iconSeriesManagement} selectedIcon={iconSeriesManagement}  text={"シリーズ管理"} />
      <NavBarItem top={top*3} onClick={onClickProfile} icon={iconPorfile} selectedIcon={iconPorfile}  text={"プロフィル管理"} />
      <NavBarItem top={top*2} onClick={onClickProduct} icon={iconProduct} selectedIcon={iconProduct}  text={"商品"} />
      <NavBarItem top={top} onClick={onClickDashboard} icon={iconDashboard} selectedIcon={iconDashboard}  text={"ダッシュボード"} />
      <TxtNavTit>ダッシュボード</TxtNavTit>
    </NavBarDashboard>
  );
}

const NavBarDashboard = styled.div`
  width: ${(props) => props.width}px;
  
  position: relative;
  

  @media only screen and (max-width: 1025px) {
      width: ${(props) => props.width - ((props.width / 10) * 2)}px;
    }

  @media only screen and (max-width: 768px) {
      display: none;
    }
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
