import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import {
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/pro-light-svg-icons";

import { getPostList as getPostListAPI } from "@API/postService";
import { getTags as getTagsAPI } from "@API/webtoonService";
import Item from "./Item";

const Items = ({ tab, typeId, onSearchPopup, searchText }) => {
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
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [selectTags, setSelectTags] = useState([]);
  const [isOrderByShow, setIsOrderByShow] = useState(false);
  const [selectOrderBy, setSelectOrderBy] = useState(orderByMenus[0]);
  const [renderItems, setRenderItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [urlQueryParams, setUrlQueryParams] = useState({ type: typeId });
  const [meta, setMeta] = useState(null);

  const getPostList = async (tab, params, tags, typeId, selectOrderBy) => {
    delete params?.completed;
    delete params?.series;
    delete params?.short;

    params.type = typeId;
    params.orderKey = selectOrderBy.code;
    params.order = "DESC";
    if (tab === "COMPLETED") {
      params.completed = 1;
    } else if (tab === "SERIES") {
      params.series = 1;
    } else if (tab === "SHORT") {
      params.short = 1;
    }

    const response = await getPostListAPI(params, tags);
    if (response.status === 200) {
      setItems(response.data.posts);
      setMeta(response.data.meta);
    }
  };

  useEffect(() => {
    // 연재중 탭이 바뀔때마다
    handleURLQueryChange("page", 1);
  }, [tab]);

  useEffect(() => {
    getPostList(tab, urlQueryParams, selectTags, typeId, selectOrderBy);
  }, [tab, urlQueryParams, selectTags, typeId, selectOrderBy]);

  useEffect(() => {
    if (searchText) {
      handleSearch(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    setRenderItems(items);
  }, [items]);

  useEffect(() => {
    async function getTags() {
      const response = await getTagsAPI();
      if (response?.status === 200) {
        setTags(response.data?.tags);
      }
    }
    if (!tags?.length) {
      getTags();
    }
  }, [tags]);

  useEffect(() => {
    if (!selectTags?.length) {
      setIsAllCategory(true);
    } else {
      setIsAllCategory(false);
    }
  }, [selectTags]);

  /**
   * 검색 쿼리 String
   */
  const handleURLQueryChange = useCallback(
    (key, value) => {
      let params = { ...urlQueryParams, page: 1 };
      if (key) {
        if (key !== "page") {
          delete params["page"];
        }
        if (!value) {
          delete params[key];
        } else {
          params[key] = value;
        }
      }
      setUrlQueryParams(params);
    },
    [urlQueryParams]
  );

  const handleSelectTagChange = useCallback(
    (item) => {
      // 검색으로 변경
      const selected = selectTags.findIndex((tag) => tag.id === item.id) > -1;
      if (selected) {
        const newTags = selectTags.filter((tag) => tag.id !== item.id);
        setSelectTags(newTags);
      } else {
        const newTags = [...selectTags, item];
        setSelectTags(newTags);
      }
    },
    [selectTags]
  );

  const handleSearch = useCallback(
    (searchText) => {
      if (searchText) {
        const filterItems = items.filter((item) => {
          if (item?.title?.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
            // }else if(item?.de?.toLowerCase().includes(searchText.toLowerCase())){
          } else {
            return false;
          }
        });
        setItems(filterItems);
      }
    },
    [items]
  );

  const pagination = useMemo(() => {
    if (meta) {
      const { currentPage, totalPages } = meta;
      let pageList = [];
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
      }

      const prev = currentPage - 1;
      const prevPage = prev - 1;
      const next = currentPage + 1;
      const nextPage = next + 1;

      let showPages;
      if (currentPage === 1) {
        if (totalPages === 0) {
          showPages = [1];
        } else {
          showPages = pageList.splice(prev, 3);
        }
      } else if (currentPage === totalPages) {
        showPages = pageList.splice(currentPage - 3, 3);
      } else {
        showPages = pageList.splice(currentPage - 2, 3);
      }

      return (
        <>
          {prevPage > 0 && (
            <li
              className="prev"
              onClick={() => handleURLQueryChange("page", prevPage)}
            >
              <a href="#">
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
            </li>
          )}
          {showPages &&
            showPages.map((page, index) => (
              <li
                key={`page_${index}`}
                className={`${page === currentPage ? "on" : ""}`}
                onClick={() => handleURLQueryChange("page", page)}
              >
                <a href="#">{page}</a>
              </li>
            ))}

          {totalPages - nextPage > 0 && (
            <li
              className="next"
              onClick={() => handleURLQueryChange("page", nextPage)}
            >
              <a href="#">
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </li>
          )}
        </>
      );
    } else {
      return <></>;
    }
  }, [meta]);

  return (
    <>
      <div className="main_sch">
        <div className="lft">
          <Link
            to="#"
            className={`btn-pk n bdrs ${isAllCategory ? "blue" : "blue2"}`}
            onClick={() => {
              setSelectTags([]);
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
          {tags &&
            tags.map((tag, index) => {
              const selected =
                selectTags.findIndex((sTag) => sTag.id === tag.id) > -1;
              return (
                <Link
                  key={`tag_${index}`}
                  to="#"
                  className={`btn-pk n bdrs blue2 ${selected ? "on" : ""}`}
                  onClick={() => {
                    handleSelectTagChange(tag);
                  }}
                >
                  #{tag.name}
                  {selected && (
                    <button
                      type="button"
                      className="btn_sch_del"
                      onClick={() => handleSelectTagChange(tag)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  )}
                </Link>
              );
            })}
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
                    onClick={() => {
                      setSelectOrderBy(menu);
                      setIsOrderByShow(!isOrderByShow);
                    }}
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
        <ul>{pagination}</ul>
      </div>
    </>
  );
};

export default Items;
