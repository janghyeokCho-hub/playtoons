import { MOBILE_WIDTH } from "@/common/constant";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


/**
   MenuTabs Component
    <MenuTabs 
      ulClassName={"inr-c"}
      barClassName={"product_bar mypage"}
      pcTop={86}
      mobileTop={39}
      tabMenu={[
        {
          name: "購入一覧",
          path: "/mypage/purchase",
        },
        {
          name: "レビューリスト",
          path: "/mypage/review",
        },
        {
          name: "お問合せ一覧",
          path: "/mypage/inquiry",
        },
      ]} 
    />
* @date 2022.12.30 11:00
* @version 1.0.0
* @author 2hyunkook
*/
export default function MenuTabs(props) {
  const { tabMenu, pcTop = 94, mobileTop = 38, className = "", ulClassName = "", barClassName = "product_bar" } = props;
  const [ stateSelected, setStateSelected ] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const refMenus = useRef([]);
  const refContainer = useRef();
  const refBar = useRef();
  

  //==============================================================================
  // function
  //==============================================================================

  /**
     참조된 element의 위치 크기 변화 감지 listener
  * @version 1.0.0
  * @author 2hyunkook
  */
  const resizeObserver = new ResizeObserver((entries) => {
    setPosition(  refMenus.current[entries[0].target.getAttribute('menu-tab-index')]  );
  });

  const isMenuPath = (path, menuPath) => {
    // const regex = /(\/\d+|\/\d+\/)$/g;
    const regex = /\/\d+|\/\d+\/$/g;
    return path.replace(regex, '') === menuPath.replace(regex, '');
  };

  /**
     url로 현재 메뉴 index 구하기
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSelected = () => {
    for( let i = 0; i < tabMenu.length; i++ ){
      if( isMenuPath (location.pathname, tabMenu[i].path) ){
        setStateSelected(i);
        break;
      }
    }
  };

  /**
     하단 파란 바 위치 설정
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setPosition = (menuElement) => {
    if( menuElement !== undefined ){
      const clientRect = menuElement.getBoundingClientRect();
  
      refBar.current.style.width = `${clientRect.width}px`;
      refBar.current.style.left = `${clientRect.left}px`;
      refBar.current.style.top = `${ window.innerWidth <= MOBILE_WIDTH ? mobileTop : pcTop }px`;
    }
  };

  
  
  //==============================================================================
  // event
  //==============================================================================

  const handleClickMenu = useCallback((item, index) => {
    setStateSelected( index );
    navigate(item.path);
  }, [tabMenu]);

  /**
    scroll 후 position 설정
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleScroll = (event) => {
    setPosition( refMenus.current[stateSelected] );
  };

  //==============================================================================
  // hook 
  //==============================================================================
  
  useEffect(() => {
    getSelected();
  }, [location]);
  
  /**
   index로 위치 설정
  * @version 1.0.0
   * @author 2hyunkook
   */
  useEffect(() => {
    if( stateSelected ){
      setPosition(refMenus.current[stateSelected]);
    }
  }, [stateSelected]);
  
  /**
   엘리먼트 변화 감지 listener, font load listener 등록
    * @version 1.0.0
    * @author 2hyunkook
    */
  useEffect(() => {
    //font load 후 위치가 바뀌어서 추가
    document.fonts.onloadingdone = () => {
      const menuElements = document.getElementsByClassName('menuTabs li');
      const index = document.querySelector('[menu-tab-index]').getAttribute('menu-tab-index');
      setPosition(menuElements[index]);
    }
    
    resizeObserver.observe(refContainer.current);
  }, []);
    
  /**
   엘리먼트 변화 감지 listener, font load listener 해제
  */
  useLayoutEffect(() => {
    return () => {
      const elements = document.querySelector('[menu-tab-index]');
      if( elements ){
        resizeObserver.unobserve(elements);
      }
      document.fonts.onloadingdone = undefined;
    }
  }, []);

  //==============================================================================
  // render 
  //==============================================================================
  const renderTabMenuElement = () => {
    return tabMenu?.map((item, index) => {
      return (
        <li
          ref={(el) => (refMenus.current[index] = el)}
          key={index}
          className={`menuTabs li ${isMenuPath(location.pathname, item.path) ? 'blue' : ''}`}
        >
          <a
            className="pointer"
            onClick={() => handleClickMenu(item, index)}
          >
            {item.name}
          </a>
        </li>
      );
    });
  };


  return (
    <div className={`hd_tabbox ${className}`} >
      <div className="tabs ty1" ref={refContainer} menu-tab-index={stateSelected} onScroll={handleScroll}>
        <ul className={`${ulClassName}`}>{renderTabMenuElement()}</ul>

        <div ref={refBar} className={`${barClassName} transition`}></div>
      </div>
    </div>
  );
}
