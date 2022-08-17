import React from "react";
import styled from "styled-components";
import { Body2 } from "@/styledMixins";
import iconPorfile from '@ICONS/dashboardeditplan-shape.png';


function DashboardProfileNavBarOff() {
  return (
    <DashboardProfileNavBarOff1>
      <IcoUserLight></IcoUserLight>
      <TxtNavDashboardOn>プロフィル管理</TxtNavDashboardOn>
    </DashboardProfileNavBarOff1>
  );
}

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

export default DashboardProfileNavBarOff;
