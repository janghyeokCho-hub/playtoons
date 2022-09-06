import React from "react";
import styled from "styled-components";
import { Body5 } from "@/styledMixins";
import { useNavigate } from "react-router-dom";
import { getResizedNumber } from "@COMMON/common";

import NavBarItem from "@COMPONENTS/dashboard/NavBarItem";

import { 
  faTableColumns as iconDashboard,
  faDiamond as iconProduct,
  faUser as iconProfile,
  faObjectUnion as iconSeries,
  faSquarePen as iconPost,
  faSeal as iconSupport,
  faChartLine as iconAnalysis } from "@fortawesome/pro-light-svg-icons";
import { faTableColumns as iconDashboardBlue } from "@fortawesome/pro-regular-svg-icons";
import { 
  faDiamond as iconProductBlue, 
  faUser as iconProfileBlue, 
  faObjectUnion as iconSeriesBlue, 
  faSquarePen as iconPostBlue, 
  faSeal as iconSupportBlue, 
  faChartLine as iconAnalysisBlue } from "@fortawesome/pro-solid-svg-icons";
  
import { useDispatch } from "react-redux";
import {showModal} from '@/modules/redux/ducks/modal';

//Nav메뉴 높이
const top = 48;

let textData = {
  dashboard: "ダッシュボード",
  support_management: "支援管理",
  post_management: "投稿管理",
  series_management: "シリーズ管理",
  profile_management: "プロフィル管理",
  product: "商品",
  analysis: "分析",
};

const DASHBOARD_PATH = {
  SUPPORT: "/dashboard/support",
  PRODUCT: "/dashboard/product/list",
  SERIES: "/dashboard/series",
  POST: "/dashboard/post",
  PROFILE: "/dashboard/profile",
  DASHBOARD: "/dashboard/main",
  ANALYSIS: "/dashboard/analysis",
};

export default function NavBarDashboard3(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickSupport = () => {
    dispatch(showModal(<>支援管理 準備しています。</>));
    // navigate(DASHBOARD_PATH.SUPPORT);
  };
  
  const onClickProduct = () => {
    // dispatch(showModal(<>商品 準備しています。</>));
    navigate(DASHBOARD_PATH.PRODUCT);
  };

  const onClickSerise = () => {
    navigate(DASHBOARD_PATH.SERIES);
  };

  const onClickPost = () => {
    navigate(DASHBOARD_PATH.POST);
  };

  const onClickProfile = () => {
    dispatch(showModal(<>プロフィル管理 準備しています。</>));
    // navigate(DASHBOARD_PATH.PROFILE);
  };

  const onClickDashboard = () => {
    // dispatch(showModal(<>ダッシュボード 準備しています。</>));
    navigate(DASHBOARD_PATH.DASHBOARD);
  };

  const onClickAnalysis = () => {
    dispatch(showModal(<>準備しています。</>));
    // navigate(DASHBOARD_PATH.ANALYSIS);
  };

  const getExtraNav = (props) => {
    switch (props.type) {
      default:
        break;
      case "post_detail":
        return (
          <NavBarItem
            top={top * 7}
            onClick={onClickAnalysis}
            icon={iconAnalysis}
            selectedIcon={iconAnalysisBlue}
            text={textData.analysis}
            name={DASHBOARD_PATH.ANALYSIS}
          />
        );
    }
  };

  return (
    <NavBarDashboard width={"300px"}>
      {getExtraNav(props)}
      <NavBarItem
        top={top * 6}
        onClick={onClickSupport}
        icon={iconSupport}
        selectedIcon={iconSupportBlue}
        text={textData.support_management}
        name={DASHBOARD_PATH.SUPPORT}
      />
      <NavBarItem
        top={top * 5}
        onClick={onClickPost}
        icon={iconPost}
        selectedIcon={iconPostBlue}
        text={textData.post_management}
        name={DASHBOARD_PATH.POST}
      />
      <NavBarItem
        top={top * 4}
        onClick={onClickSerise}
        icon={iconSeries}
        selectedIcon={iconSeriesBlue}
        text={textData.series_management}
        name={DASHBOARD_PATH.SERIES}
      />
      <NavBarItem
        top={top * 3}
        onClick={onClickProfile}
        icon={iconProfile}
        selectedIcon={iconProfileBlue}
        text={textData.profile_management}
        name={DASHBOARD_PATH.PROFILE}
      />
      <NavBarItem
        top={top * 2}
        onClick={onClickProduct}
        icon={iconProduct}
        selectedIcon={iconProductBlue}
        text={textData.product}
        name={DASHBOARD_PATH.PRODUCT}
      />
      <NavBarItem
        top={top}
        onClick={onClickDashboard}
        icon={iconDashboard}
        selectedIcon={iconDashboardBlue}
        text={textData.dashboard}
        name={DASHBOARD_PATH.DASHBOARD}
      />
      <Title>{textData.dashboard}</Title>
    </NavBarDashboard>
  );
}

const NavBarDashboard = styled.div`
  width: ${(props) => props.width};
  min-width: 200px;
  position: relative;

  @media only screen and (max-width: 1025px) {
    width: ${(props) => getResizedNumber(props.width, 0.8)};
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const Title = styled.div`
  ${Body5}
  position: absolute;
  top: 20px;
  left: 33px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 16px;
  white-space: nowrap;
`;
