import {
  faMagnifyingGlass
} from "@fortawesome/pro-light-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { setReduxOfWebtoon } from "@/common/common";
import { getPostList as getPostListAPI } from "@API/postService";
import { getTags as getTagsAPI } from "@API/webtoonService";
import SearchPopup from "@COMPONENTS/SearchPopup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../dashboard/Dropdown";
import MyPagination from "../dashboard/MyPagination";
import Item from "./Item";
import EmptyDiv from "../dashboard/EmptyDiv";

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
  const reduxWebtoon = useSelector( ({post}) => post.webtoon );
  const [items, setItems] = useState([]);
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [selectTags, setSelectTags] = useState([]);
  const [selectOrderBy, setSelectOrderBy] = useState(orderByMenus[0]);
  const [renderItems, setRenderItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [urlQueryParams, setUrlQueryParams] = useState({ type: typeId });
  const [meta, setMeta] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const setOrderBy = (item) => {
    setSelectOrderBy(item);
    setReduxOfWebtoon(dispatch, reduxWebtoon?.type, 1, item?.code);
  };

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

  useEffect(() => {
    if( reduxWebtoon ){
      setSelectOrderBy({code: reduxWebtoon?.orderBy});
      handleURLQueryChange("page", reduxWebtoon?.page);
    }
  }, [reduxWebtoon]);

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

  const handleSelectTagChange = useCallback((item) => {
      // 검색으로 변경
      const selected = selectTags.findIndex((tag) => tag.id === item.id) > -1;
      if (selected) {
        const newTags = selectTags.filter((tag) => tag.id !== item.id);
        setSelectTags(newTags);
      } else {
        const newTags = [...selectTags, item];
        setSelectTags(newTags);
      }
    }, [selectTags]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };


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
              <Dropdown
                className={'wt'}
                dataList={orderByMenus} 
                selected={selectOrderBy?.code}  // TODO redux 값 초기화로 받아야함. 
                handleItemClick={setOrderBy}/>
            </div>
          </div>
          <div className="lst_main_comic">
            <ul>
              {renderItems && renderItems?.length > 0 ? (
                  renderItems.map((item, index) => (
                    <Item key={`item_${index}`} item={item} />
                  ))
                ) : (
                  <EmptyDiv
                    className={"relative empty"}
                    text={'ウェブトゥーンがいません。'}
                    />
                )
              }
            </ul>
          </div>

          <MyPagination
              className={""}
              meta={meta}
              callback={(page) => {
                handleURLQueryChange("page", page);
                setReduxOfWebtoon(dispatch, reduxWebtoon?.type, page, reduxWebtoon?.orderBy);
              }}
            />

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
