import React from 'react';
import NavBarDashboard from './dashboard/NavBarDashboard';
import Header from './Header';

export default function Container(props) {
  return (
    <div id="wrap">
      <Header />

      <div id="container" className="container dashboard">
        <NavBarDashboard />

        <div className="contents">
          {props?.children}
        </div>
      </div>
    </div>
  )
}
