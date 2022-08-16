import React from "react";
import styled from "styled-components";
import { Body2 } from "@/styledMixins";


function DashboardItemNavBarOff(props) {
  const { icoDiamondLight, txtNavDashboardOn, onClick } = props;

  return (
    <DashboardItemNavBarOff1
      onClick={props.onClick}>
      <IcoDiamondLight style={{ backgroundImage: `url(${icoDiamondLight})` }}></IcoDiamondLight>
      <TxtNavDashboardOn>{txtNavDashboardOn}</TxtNavDashboardOn>
    </DashboardItemNavBarOff1>
  );
}

const DashboardItemNavBarOff1 = styled.div`
  position: absolute;
  width: 230px;
  height: 24px;
  top: 124px;
  left: 30px;
  display: flex;
`;

const IcoDiamondLight = styled.div`
  margin-top: 12px;
  width: 24px;
  height: 24px;
  margin-left: 30px;
  background-size: 100% 100%;
`;

const TxtNavDashboardOn = styled.div`
  ${Body2}
  margin-top: 14px;
  width: 107px;
  height: 20px;
  margin-left: 30px;
  margin-right: 40px;
  flex: 1;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

export default DashboardItemNavBarOff;
