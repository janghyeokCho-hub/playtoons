import React from "react";
import styled from "styled-components";
import { Body1 } from "@/styledMixins";


function NavBarDashboardPlanOff(props) {
  const { icoSealSolid, txtNavDashboardOn, onClick } = props;

  return (
    <NavBarDashboardSeriesOff
      onClick={props.onClick}>
      <IcoObjectUnionSolid style={{ backgroundImage: `url(${icoSealSolid})` }}></IcoObjectUnionSolid>
      <TxtNavDashboardOn>{txtNavDashboardOn}</TxtNavDashboardOn>
    </NavBarDashboardSeriesOff>
  );
}

const NavBarDashboardSeriesOff = styled.div`
  position: absolute;
  width: 300px;
  height: 48px;
  top: 224px;
  left: 0;
  display: flex;
  background-color: var(--selago);
`;

const IcoObjectUnionSolid = styled.div`
  margin-top: 12px;
  width: 24px;
  height: 24px;
  margin-left: 30px;
  background-size: 100% 100%;
`;

const TxtNavDashboardOn = styled.div`
  ${Body1}
  margin-top: 14px;
  width: 177px;
  height: 20px;
  margin-left: 30px;
  margin-right: 40px;
  flex: 1;
  font-weight: 700;
  color: var(--violet-blue);
  line-height: 20px;
  white-space: nowrap;
`;

export default NavBarDashboardPlanOff;
