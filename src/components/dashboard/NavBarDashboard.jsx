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
  faSeal as iconPlan,
  faChartLine as iconAnalysis } from "@fortawesome/pro-light-svg-icons";
import { faTableColumns as iconDashboardBlue } from "@fortawesome/pro-regular-svg-icons";
import { 
  faDiamond as iconProductBlue, 
  faUser as iconProfileBlue, 
  faObjectUnion as iconSeriesBlue, 
  faSquarePen as iconPostBlue, 
  faSeal as iconPlanBlue, 
  faChartLine as iconAnalysisBlue } from "@fortawesome/pro-solid-svg-icons";
  
import { useDispatch } from "react-redux";
import {showModal} from '@/modules/redux/ducks/modal';

let textData = {
  dashboard: "ダッシュボード",
  plan_management: "支援管理",
  post_management: "投稿管理",
  series_management: "シリーズ管理",
  profile_management: "プロフィル管理",
  product: "商品",
  analysis: "分析",
};

const DASHBOARD_PATH = {
  PLAN: "/dashboard/plan",
  PRODUCT: "/dashboard/product/list",
  SERIES: "/dashboard/series",
  POST: "/dashboard/post",
  PROFILE: "/dashboard/profile/upload",
  DASHBOARD: "/dashboard/main",
  ANALYSIS: "/dashboard/analysis",
};

export default function NavBarDashboard3(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPlan = () => {
    // dispatch(showModal(<>支援管理 準備しています。</>));
    navigate(DASHBOARD_PATH.PLAN);
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
    // dispatch(showModal(<>プロフィル管理 準備しています。</>));
    navigate(DASHBOARD_PATH.PROFILE);
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
    switch (props?.type) {
      default:
        break;
      case "post_detail":
        return (
          // iconAnalysis
          <NavBarItem 
            text={textData.analysis}
            path={DASHBOARD_PATH.ANALYSIS}
            onClick={onClickAnalysis}
            icon={iconAnalysis}
            selectedIcon={iconAnalysisBlue}
            />
        );
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="tit">{textData.dashboard}</h2>
      <nav className="menu">
        <ul>
          <NavBarItem 
            text={textData.dashboard}
            path={DASHBOARD_PATH.DASHBOARD}
            onClick={onClickDashboard}
            icon={iconDashboard}
            selectedIcon={iconDashboardBlue}
            />
          <NavBarItem 
            text={textData.product}
            path={DASHBOARD_PATH.PRODUCT}
            onClick={onClickProduct}
            icon={iconProduct}
            selectedIcon={iconProductBlue}
            />
          <NavBarItem 
            text={textData.profile_management}
            path={DASHBOARD_PATH.PROFILE}
            onClick={onClickProfile}
            icon={iconProfile}
            selectedIcon={iconProfileBlue}
            />
          <NavBarItem 
            text={textData.series_management}
            path={DASHBOARD_PATH.SERIES}
            onClick={onClickSerise}
            icon={iconSeries}
            selectedIcon={iconSeriesBlue}
            />
          <NavBarItem 
            text={textData.post_management}
            path={DASHBOARD_PATH.POST}
            onClick={onClickPost}
            icon={iconPost}
            selectedIcon={iconPostBlue}
            />
          <NavBarItem 
            text={textData.plan_management}
            path={DASHBOARD_PATH.PLAN}
            onClick={onClickPlan}
            icon={iconPlan}
            selectedIcon={iconPlanBlue}
            />
          {
            getExtraNav()
          }
        </ul>
      </nav>
    </aside>
  );
}
