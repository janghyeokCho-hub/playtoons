import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import {
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/pro-light-svg-icons";

import { getPostList as getPostListAPI } from "@API/postService";
import Item from "./Item";

const EveryItems = ({ type, categorys, onSearchPopup }) => {
  const orderByMenus = [
    {
      // 추천순
      code: "recommend",
      name: "おすすめ順",
    },
    {
      // 평가순
      code: "rank",
      name: "評価順",
    },
    {
      // 신작순
      code: "recent",
      name: "新着順",
    },
  ];
  const [items, setItems] = useState([]);
  const [useCategorys, setUseCategorys] = useState([]);
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [selectCategorys, setSelectCategorys] = useState([]);
  const [isOrderByShow, setIsOrderByShow] = useState(false);
  const [selectOrderBy, setSelectOrderBy] = useState(orderByMenus[0]);
  const [renderItems, setRenderItems] = useState([]);

  const getPostList = useCallback(async () => {
    const params = {
      orderKey: selectOrderBy.code,
      order: "DESC",
    };
    const response = await getPostListAPI(type, params);
    if (response.status === 200) {
      setItems(response.data.posts);
      setRenderItems(response.data.posts);
    }
  }, [selectOrderBy, type]);

  useEffect(() => {
    if (type && selectOrderBy) {
      getPostList();
    }
  }, [type, selectOrderBy]);

  useEffect(() => {
    if (categorys?.length && items?.length) {
      const list = [...new Set(items.map((item) => item.categoryId))];
      const categoryList = categorys.filter((category) =>
        list.includes(category.id)
      );
      setUseCategorys(categoryList);
    }
  }, [categorys, items]);

  useEffect(() => {
    if (!selectCategorys?.length) {
      setRenderItems(items);
      setIsAllCategory(true);
    } else {
      let filterItems = [];
      selectCategorys.forEach((categoryId) => {
        const filterItem = items.filter(
          (item) => item.categoryId === categoryId
        );
        filterItems = filterItems.concat(filterItem);
      });
      setRenderItems(filterItems);
      setIsAllCategory(false);
    }
  }, [selectCategorys, items]);

  const handleSelectCategoryChange = useCallback(
    (id) => {
      if (selectCategorys.includes(id)) {
        const updateCategory = selectCategorys.filter(
          (cateId) => cateId !== id
        );
        setSelectCategorys(updateCategory);
      } else {
        const newCategorys = [...selectCategorys, id];
        setSelectCategorys(newCategorys);
      }
    },
    [selectCategorys]
  );

  const handleSelectOrderBy = useCallback(
    (menu) => {
      /**
       * 여기서 정렬
       */
      setSelectOrderBy(menu);
      setIsOrderByShow(!isOrderByShow);
    },
    [isOrderByShow]
  );

  return (
    <>
      <div className="main_sch">
        <div className="lft">
          <Link
            to="#"
            className={`btn-pk n bdrs ${isAllCategory ? "blue" : "blue2"}`}
            onClick={() => {
              setSelectCategorys([]);
            }}
          >
            すべて
          </Link>
          <button
            type="button"
            className="btn_sch_input"
            onClick={() => onSearchPopup()}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
          </button>
          {useCategorys &&
            useCategorys.map((tag, index) => (
              <Link
                key={`tag_${index}`}
                to="#"
                className={`btn-pk n bdrs blue2 ${
                  selectCategorys.includes(tag.id) ? "on" : ""
                }`}
                onClick={() => {
                  handleSelectCategoryChange(tag.id);
                }}
              >
                {tag.name}
                {selectCategorys.includes(tag.id) && (
                  <button
                    type="button"
                    className="btn_sch_del"
                    onClick={() => handleSelectCategoryChange(tag.id)}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                )}
              </Link>
            ))}
        </div>
        <div className="rgh">
          <div className="btn_select1">
            <button
              type="button"
              className="select_tit"
              onClick={() => setIsOrderByShow(!isOrderByShow)}
            >
              {selectOrderBy.name}
            </button>
            <div
              className="select_list"
              style={{ display: isOrderByShow ? "" : "none" }}
            >
              <ul>
                {orderByMenus.map((menu, index) => (
                  <li
                    key={`orderby_${index}`}
                    onClick={() => handleSelectOrderBy(menu)}
                  >
                    <a href="#">{menu.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lst_main_comic">
        <ul>
          {renderItems &&
            renderItems.map((item, index) => (
              <Item key={`item_${index}`} item={item} />
            ))}
        </ul>
      </div>
      <div className="pagenation">
        <ul>
          <li className="prev">
            <a href="#">
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li className="on">
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li className="next">
            <a href="#">
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default EveryItems;
