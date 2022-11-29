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
import SearchPopup from "@COMPONENTS/SearchPopup";

const Items = ({ tab, typeId }) => {
  const orderByMenus = [
    {
      // 신작순
      code: "recent",
      name: "新着順",
    },
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
  ];
  const [items, setItems] = useState([]);
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [selectTags, setSelectTags] = useState([]);
  const [isOrderByShow, setIsOrderByShow] = useState(false);
  const [selectOrderBy, setSelectOrderBy] = useState(orderByMenus[0]);
  const [renderItems, setRenderItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [urlQueryParams, setUrlQueryParams] = useState({ type: typeId });
  const [meta, setMeta] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPostList = async (tab, params, tags, typeId, selectOrderBy) => {
    setLoading(true);
    setItems([]);
    delete params["completed"];
    delete params["series"];
    delete params["short"];

    params.typeId = typeId;
    params.orderKey = selectOrderBy.code;
    params.order = "DESC";
    params.limit = 16;

    if (tab === "COMPLETED") {
      params.completed = true;
    } else if (tab === "SERIES") {
      params.series = true;
    } else if (tab === "SHORT") {
      params.short = true;
    }

    if (!params?.page) {
      params["page"] = 1;
    }

    const response = await getPostListAPI(params, tags);
    if (response.status === 200) {
      setItems(response.data.posts);
      setMeta(response.data.meta);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 연재중 탭이 바뀔때마다
    handleURLQueryChange("page", 1);
  }, [tab]);

  useEffect(() => {
    if (typeId !== undefined) {
      //typeId가 준비되지 않은 상태에서도 api 날아가는걸 방지
      getPostList(tab, urlQueryParams, selectTags, typeId, selectOrderBy);
    }
  }, [tab, urlQueryParams, selectTags, typeId, selectOrderBy]);

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

  useEffect(() => {
    handleURLQueryChange("keyword", searchText);
  }, [searchText]);

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

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const pagination = useMemo(() => {
    if (meta) {
      const { currentPage, totalPages, itemCount } = meta;
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
        if (totalPages < 3) {
          showPages = pageList;
        } else {
          showPages = pageList.splice(currentPage - 3, 3);
        }
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

          {itemCount > 0 && totalPages - nextPage > 0 && (
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
      {!loading && (
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
                onClick={() => setIsSearchPopupShow(!isSearchPopupShow)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
                {searchText || "ハッシュタグ検索"}
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
          {isSearchPopupShow && (
            <SearchPopup
              handleClose={() => setIsSearchPopupShow(!isSearchPopupShow)}
              onSearch={handleSearch}
            />
          )}
        </>
      )}
    </>
  );
};

export default Items;
