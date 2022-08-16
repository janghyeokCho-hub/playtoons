import React from "react";
import styled from "styled-components";
import { Body2 } from "@/styledMixins";


function NavBarDashboardPostOff(props) {
  const { icoSquarePenLight, txtNavDashboardOn, className, onClick } = props;

  return (
    <NavBarDashboardPlanOff className={`nav_bar_dashboard_plan_off ${className || ""}`} onClick={props.onClick} >
      <IcoSealLight className="ico-seal-light" style={{ backgroundImage: `url(${icoSquarePenLight})` }}></IcoSealLight>
      <TxtNavDashboardOn className="txt-nav-dashboard-on">{txtNavDashboardOn}</TxtNavDashboardOn>
    </NavBarDashboardPlanOff>
  );
}

const NavBarDashboardPlanOff = styled.div`
  position: absolute;
  width: 228px;
  height: 24px;
  top: 348px;
  left: 32px;
  display: flex;

  &.nav_bar_dashboard_plan_off.nav_bar_dashboard_post_off {
    top: 292px;
  }
`;

const IcoSealLight = styled.div`
  margin-top: 12px;
  width: 24px;
  height: 24px;
  margin-left: 32px;
  background-size: 100% 100%;
`;

const TxtNavDashboardOn = styled.div`
  ${Body2}
  margin-top: 14px;
  width: 105px;
  height: 20px;
  margin-left: 28px;
  margin-right: 40px;
  flex: 1;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

export default NavBarDashboardPostOff;
