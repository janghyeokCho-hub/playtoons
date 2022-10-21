import React, { useEffect } from "react";
import NavBarDashboard from "./NavBarDashboard";
import Header from "@/components/Header";
import { useState } from "react";
import { useWindowSize } from "@/hook/useWindowSize";

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
  const [ stateIsOpen, setStateIsOpen ] = useState(false);
  const { type, backTitle, children } = props;
  const windowSize = useWindowSize();
  const [ stateIsMobile, setStateIsMobile ] = useState(false);

  const getWrapClassName = () => {
    return stateIsOpen ? 'open' : '';
  };

  const getNavClassName = () => {
    return stateIsOpen ? 'w100p' : 'w0';
  };
  
  const handleClickMenu = (event) => {
    setStateIsOpen( !stateIsOpen );
  };

  useEffect(() => {
    setStateIsMobile(windowSize.width < 961);
  }, [windowSize]);

  useEffect(() => {
    if(stateIsMobile && stateIsOpen){
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    else{
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

  }, [stateIsOpen]);

  return (
      stateIsMobile ? (
        <>
          <div id="wrap" className={getWrapClassName()} >
            <Header backTitle={backTitle} onSideMenu={() => handleClickMenu()}/>
            <div id="container" className={`container ${type}`}>
              <div className="contents">{children}</div>
            </div>

                <div className={`popup_dim ${getNavClassName()}`} onClick={() => handleClickMenu()}>
                  <NavBarDashboard className={`transition ${getNavClassName()}`} />
                </div>
          </div>
        </>
      ) : (
        <>
          <div id="wrap" className={getWrapClassName()}>
            <Header backTitle={backTitle} onSideMenu={() => handleClickMenu()}/>

            <div id="container" className={`container ${type}`}>
              <NavBarDashboard />
              <div className="contents">{children}</div>
            </div>
          </div>
        </>
      )
  );
}
