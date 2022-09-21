import React from 'react';
import NavBarDashboard from './NavBarDashboard';
import Header from '../Header';

/**
*
  <Container
      type={"series"}>
      .....
  </Container>
*
* @version 1.0.0
* @author 2hyunkook
* @param type dashboard, series 등 container div 스타일
* @return
*/
export default function Container(props) {
  return (
    <div id="wrap">
      <Header />

      <div id="container" className={`container ${props?.type}`}>
        <NavBarDashboard />

        <div className="contents">
          {props?.children}
        </div>
      </div>
    </div>
  )
}
