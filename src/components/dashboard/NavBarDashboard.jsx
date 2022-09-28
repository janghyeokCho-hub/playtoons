import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {showModal} from '@/modules/redux/ducks/modal';
import NavBarItem from "@COMPONENTS/dashboard/NavBarItem";

//==============================================================================
import { 
  faTableColumns as iconDashboard,
  faDiamond as iconProduct,
  faUser as iconProfile,
  faObjectUnion as iconSeries,
  faSquarePen as iconPost,
  faSeal as iconPlan,
  faChartLine as iconAnalysis } from "@fortawesome/pro-light-svg-icons";

import { faTableColumns as iconDashboardOn } from "@fortawesome/pro-regular-svg-icons";
import { 
  faDiamond as iconProductOn, 
  faUser as iconProfileOn, 
  faObjectUnion as iconSeriesOn, 
  faSquarePen as iconPostOn, 
  faSeal as iconPlanOn, 
  faChartLine as iconAnalysisOn } from "@fortawesome/pro-solid-svg-icons";
  //==============================================================================

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
  PRODUCT: "/dashboard/product",
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
    // navigate(DASHBOARD_PATH.PLAN);
  };
  
  const onClickProduct = () => {
    // dispatch(showModal(<>商品 準備しています。</>));
    // navigate(DASHBOARD_PATH.PRODUCT);
  };

  const onClickSerise = () => {
    // navigate(DASHBOARD_PATH.SERIES);
  };

  const onClickPost = () => {
    // navigate(DASHBOARD_PATH.POST);
  };

  const onClickProfile = () => {
    // dispatch(showModal(<>プロフィル管理 準備しています。</>));
    // navigate(DASHBOARD_PATH.PROFILE);
  };

  const onClickDashboard = () => {
    // dispatch(showModal(<>ダッシュボード 準備しています。</>));
    // navigate(DASHBOARD_PATH.DASHBOARD);
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
            selectedIcon={iconAnalysisOn}
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
            selectedIcon={iconDashboardOn}
            />
          <NavBarItem 
            text={textData.product}
            path={DASHBOARD_PATH.PRODUCT}
            onClick={onClickProduct}
            icon={iconProduct}
            selectedIcon={iconProductOn}
            />
          <NavBarItem 
            text={textData.profile_management}
            path={DASHBOARD_PATH.PROFILE}
            onClick={onClickProfile}
            icon={iconProfile}
            selectedIcon={iconProfileOn}
            />
          <NavBarItem 
            text={textData.series_management}
            path={DASHBOARD_PATH.SERIES}
            onClick={onClickSerise}
            icon={iconSeries}
            selectedIcon={iconSeriesOn}
            />
          <NavBarItem 
            text={textData.post_management}
            path={DASHBOARD_PATH.POST}
            onClick={onClickPost}
            icon={iconPost}
            selectedIcon={iconPostOn}
            />
          <NavBarItem 
            text={textData.plan_management}
            path={DASHBOARD_PATH.PLAN}
            onClick={onClickPlan}
            icon={iconPlan}
            selectedIcon={iconPlanOn}
            />
          {
            getExtraNav()
          }
        </ul>
      </nav>
    </aside>
  );
}
