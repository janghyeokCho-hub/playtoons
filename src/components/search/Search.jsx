import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import All from "./All";
import Series from "./Series";
import Hashtag from "./Hashtag";
import Author from "./Author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { faCircleXmark, faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Search = () => {
  const orderTypes = [
    {
      code: "RECOMMEND",
      name: "おすすめ順",
    },
    {
      code: "LATEST",
      name: "最新順",
    },
  ];
  const [selectTab, setSelectTab] = useState("ALL");
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(orderTypes[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const keyword = useSelector(({ search }) => search.keyword);
  const totalItems = useSelector(({ search }) => search.totalItems);
  const tags = useSelector(({ search }) => search.tags);
  const authors = useSelector(({ search }) => search.authors);
  const [selectTag, setSelectTag] = useState(null);

  const handleOrderChange = useCallback((item) => {
    setSelectOrder(item);
    setIsOrderOpen(false);
  }, []);

  useEffect(() => {
    if (tags?.length > 0 && !selectTag) {
      setSelectTag(tags[0]);
    }
  }, [tags, selectTag]);

  return (
    <>
      <div className="top_search inr-c">
        <h2 className="m_tit1">
          <span className="c-blue">“{keyword}”</span>の検索結果 {totalItems}件
        </h2>
        <div className="in ty1">
          <div className="lft">
            <div className="tabs ty2">
              <ul>
                <li
                  className={selectTab === "ALL" ? "on" : ""}
                  onClick={() => setSelectTab("ALL")}
                >
                  <Link to="">すべて</Link>
                </li>
                <li
                  className={selectTab === "SERIES" ? "on" : ""}
                  onClick={() => setSelectTab("SERIES")}
                >
                  <Link to="">シリーズ</Link>
                </li>
                <li
                  className={selectTab === "HASHTAG" ? "on" : ""}
                  onClick={() => setSelectTab("HASHTAG")}
                >
                  <Link to="">ハッシュタグ</Link>
                </li>
                <li
                  className={selectTab === "AUTHOR" ? "on" : ""}
                  onClick={() => setSelectTab("AUTHOR")}
                >
                  <Link to="">クリエイター</Link>
                </li>
              </ul>
            </div>
          </div>
          {selectTab === "HASHTAG" && (
            <div className="main_sch">
              <button
                type="button"
                className="btn_sch_input"
                onClick={() => setIsPopupOpen(true)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
              </button>

              {tags?.map((tag, index) => {
                const selected = selectTag?.id === tag.id;
                return (
                  <Link
                    key={`tag_${index}`}
                    to=""
                    className={`btn-pk n bdrs ${selected ? "blue" : "blue2"}`}
                    onClick={() => setSelectTag(tag)}
                  >
                    {tag.name}
                    <button type="button" className="btn_sch_del">
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
          {isPopupOpen && (
            <div className="popup_dim">
              <div id="popSearch" className="layerPopup pop_search">
                <div className="popup">
                  <div className="pop_head">
                    <h2 className="title">ハッシュタグ検索</h2>
                    <button type="button" className="btn_pop_close b-close">
                      <FontAwesomeIcon icon={faXmarkLarge} />
                      close
                    </button>
                  </div>
                  <div className="pop_cont">
                    <input
                      type="text"
                      className="inp_txt w100p"
                      placeholder="ハッシュタグ名"
                    />
                  </div>
                  <div className="pop_botm">
                    <button
                      type="button"
                      className="btn-pk blue2"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      キャンセル
                    </button>
                    <button type="button" className="btn-pk blue">
                      検索
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="rgh">
            <div className="btn_select1">
              <button
                type="button"
                className="select_tit"
                onClick={() => setIsOrderOpen(!isOrderOpen)}
              >
                {selectOrder.name}
              </button>
              {isOrderOpen && (
                <div className="select_list">
                  <ul>
                    {orderTypes.map((item, index) => (
                      <li
                        key={`orderType_${index}`}
                        onClick={() => handleOrderChange(item)}
                      >
                        <Link to="">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTab === "ALL" && <All orderType={selectOrder} />}
      {selectTab === "SERIES" && <Series orderType={selectOrder} />}
      {selectTab === "HASHTAG" && (
        <Hashtag orderType={selectOrder} selectTag={selectTag} />
      )}
      {selectTab === "AUTHOR" && (
        <div className="area_schmain2 inr-c">
          <div className="lst_sch_profile">
            {authors?.map((author, index) => (
              <Author
                key={`author_${index}`}
                item={author}
                orderType={selectOrder}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
