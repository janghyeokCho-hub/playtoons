import React, { useEffect } from 'react';
import { Link, } from 'react-router-dom';

const TAB_MENU = [
  {
    name: "商品一覧",
    path: "/dashboard/product"
  },
  {
    name: "販売内訳",
    path: "/dashboard/product/sales/list"
  },
  {
    name: "商品のお問い合せ",
    path: "/dashboard/product/sales/inquiry"
  },
  {
    name: "レビュ一覧",
    path: "/dashboard/product/sales/review"
  },
];

export default function ProductTab(props) {
  const { pathname } = props;
  

  const getTabMenuElement = () => {
    return TAB_MENU.map((item, index) => {
      return (
        <li className={`transition ${pathname === item.path && 'on'}`} key={index} >
          <Link to={item.path} >
            { item.name }
          </Link>
        </li>
      );
    });
  };

  useEffect(() => {
  
  }, [pathname]);
  

  return (
    <div className="hd_tabbox">
			  <div className="tabs ty1">
          <ul className="">
            {
              getTabMenuElement()
            }
          </ul>
        </div>
      </div>
  )
}
