import React from "react";
import styled from "styled-components";
import { Body2 } from "@/styledMixins";


function NavBar() {
  return (
    <NavBar1>
      <IcoTableColumnsLight></IcoTableColumnsLight>
      <TxtNavDashboardOff>ダッシュボード</TxtNavDashboardOff>
    </NavBar1>
  );
}

const NavBar1 = styled.div`
  position: absolute;
  width: 230px;
  height: 21px;
  top: 70px;
  left: 30px;
  display: flex;
`;

const IcoTableColumnsLight = styled.div`
  margin-top: 14px;
  width: 24px;
  height: 21px;
  margin-left: 30px;
  background-image: url(@IMAGES/dashboardseries-shape.png);
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
`;

export default NavBar;
