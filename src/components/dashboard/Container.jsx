import React from 'react';
import NavBarDashboard from './NavBarDashboard';
import Header from '../Header';

/**
*
  <Container
      type={"series"}
      handleBack={handleBack} 
      backTitle={"シリーズ詳細"}
      >
      .....
  </Container>
*
* @version 1.0.0
* @author 2hyunkook
* @param type dashboard, series 등 container div 스타일
* @param handleBack back button event
* @param backTitle back button text
* @return
*/
export default function Container(props) {
  return (
    <div id="wrap">
      <Header 
        handleBack={props.handleBack}
        backTitle={props.backTitle}
        />

      <div id="container" className={`container ${props.type}`}>
        <NavBarDashboard />

        <div className="contents">
          {props?.children}
        </div>
      </div>
    </div>
  )
}
