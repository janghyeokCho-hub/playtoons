import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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

export default function ProductTab() {
  const location = useLocation();

  const getTabMenuElement = () => {
    return TAB_MENU.map((item, index) => {
      return (
        <li className={`dashboard-gnb ${location.pathname === item.path && 'selected'}`} key={index} >
          <Link to={item.path} >
            { item.name }
          </Link>
        </li>
      );
    });
  };

  return (
    <ul className="dashboard-gnb">
      {
        getTabMenuElement()
      }
    </ul>
  )
}
