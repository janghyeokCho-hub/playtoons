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

//Nav메뉴 높이
const top = 48;

let textData = {
  dashboard : "ダッシュボード",
  support_management : "支援管理",
  post_management : "投稿管理",
  series_management : "シリーズ管理",
  profile_management : "プロフィル管理",
  product : "商品",
  analysis : "分析",

};

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

const getExtraNav = ( props ) => {
  switch(props.type){
    default : 
      break;
    case "post_detail" : 
      return ( <NavBarItem top={top*7} onClick={onClickAnalysis} icon={iconAnalysis} selectedIcon={iconAnalysis} text={textData.analysis} /> );
  }

}

function NavBarDashboard3(props) {
 

  return (
    <NavBarDashboard width={300}>
      {
        getExtraNav(props)
      }
      <NavBarItem top={top*6} onClick={onClickSupport} icon={iconSupport} selectedIcon={iconSupport} text={textData.support_management} />
      <NavBarItem top={top*5} onClick={onClickPost} icon={iconContribution} selectedIcon={iconContribution}  text={textData.post_management} />
      <NavBarItem top={top*4} onClick={onClickSerise} icon={iconSeriesManagement} selectedIcon={iconSeriesManagement}  text={textData.series_management} />
      <NavBarItem top={top*3} onClick={onClickProfile} icon={iconPorfile} selectedIcon={iconPorfile}  text={textData.profile_management} />
      <NavBarItem top={top*2} onClick={onClickProduct} icon={iconProduct} selectedIcon={iconProduct}  text={textData.product} />
      <NavBarItem top={top} onClick={onClickDashboard} icon={iconDashboard} selectedIcon={iconDashboard}  text={textData.dashboard} />
      <TxtNavTit>{textData.dashboard}</TxtNavTit>
    </NavBarDashboard>
  );
}

const NavBarDashboard = styled.div`
  width: ${(props) => props.width}px;
  
  position: relative;
  

  @media only screen and (max-width: 1025px) {
      width: ${(props) => props.width - ((props.width / 10) * 2)}px;
    }

  @media only screen and (max-width: 1000px) {
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
