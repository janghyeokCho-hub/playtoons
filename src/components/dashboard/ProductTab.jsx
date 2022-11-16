import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TAB_MENU = [
  {
    name: "商品一覧",
    path: "/dashboard/product",
  },
  {
    name: "販売内訳",
    path: "/dashboard/product/sales/list",
  },
  {
    name: "商品のお問い合せ",
    path: "/dashboard/product/sales/inquiry",
  },
  {
    name: "レビュ一覧",
    path: "/dashboard/product/sales/review",
  },
];

export default function ProductTab(props) {
  const PC_TOP = 94;
  const MOBILE_TOP = 40;
  
  const [ stateSelected, setStateSelected ] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const refMenu = useRef([]);
  const refContainer = useRef();
  const refBar = useRef();


  const resizeObserver = new ResizeObserver((entries) => {
    setPosition(  refMenu.current[entries[0].target.getAttribute('data-index')]  );
  });

  const getSelected = () => {
    for( let i = 0; i < TAB_MENU.length; i++ ){
      if( location.pathname === TAB_MENU[i].path ){
        setStateSelected(i);
        break;
      }
    }
  };

  const setPosition = (menuElement, text) => {
    console.log('setPosition', menuElement);

    if( menuElement !== undefined ){
      const clientRect = menuElement.getBoundingClientRect();
  
      refBar.current.style.width = `${clientRect.width}px`;
      refBar.current.style.left = `${clientRect.left}px`;
      refBar.current.style.top = `${ window.innerWidth < 960 ? MOBILE_TOP : PC_TOP }px`;

    }
  };

  const handleClickMenu = (event) => {
    setStateSelected( event.target.getAttribute("index") );
    navigate(event.target.getAttribute("data-path"));
  };

  const renderTabMenuElement = () => {
    return TAB_MENU.map((item, index) => {
      return (
        <li
          ref={(el) => (refMenu.current[index] = el)}
          key={index}
          className={`${location.pathname === item.path ? 'blue' : ''}`}
        >
          <a
            className="pointer"
            onClick={handleClickMenu}
            data-path={item.path}
            index={index}
          >
            {item.name}
          </a>
        </li>
      );
    });
  };

  useLayoutEffect(() => {
    getSelected();
    resizeObserver.observe(refContainer.current);

    return () => {
      resizeObserver.unobserve(refContainer.current);
    }
  }, []);

  // useLayoutEffect(() => {
  //   if( stateSelected !== undefined ){
  //     setPosition(refMenu.current[stateSelected], 'useLayoutEffect');
  //   }
  // }, [stateSelected]);

  useEffect(() => {
    if( stateSelected !== undefined ){
      setPosition(refMenu.current[stateSelected]);
    }
  }, [stateSelected]);

  return (
    <div className="hd_tabbox">
      <div className="tabs ty1" ref={refContainer} data-index={stateSelected}>
        <ul className="">{renderTabMenuElement()}</ul>
        <div ref={refBar} className={"product_bar transition"}></div>

      </div>
    </div>
  );
}
