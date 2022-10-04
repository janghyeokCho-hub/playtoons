import React from "react";
import NavBarDashboard from "./NavBarDashboard";
import Header from "@/components/Header";

/**
*
  <Container
      type={"series"}
      backTitle={"シリーズ詳細"}
      >
      .....
  </Container>
*
* @version 1.0.0
* @author 2hyunkook
* @param type dashboard, series 등 container div 스타일
* @param backTitle back button text
* @return
*/
export default function Container(props) {
  const { type, backTitle, children } = props;

  return (
    <div id="wrap">
      <Header backTitle={backTitle} />

      <div id="container" className={`container ${type}`}>
        <NavBarDashboard />

        <div className="contents">{children}</div>
      </div>
    </div>
  );
}
