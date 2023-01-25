import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getSearchProducts as getSearchProductsAPI } from "@API/searchService";
import ProductItems from "./ProductItems";

const Store = () => {
  const keyword = useSelector(({ search }) => search.keyword);
  const totalProductItems = useSelector(
    ({ search }) => search.totalProductItems
  );
  const productCategories = useSelector(
    ({ search }) => search.productCategories
  );
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
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(orderTypes[0]);
  const [selectCategory, setSelectCategory] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsMeta, setProductsMeta] = useState(null);

  const handleOrderChange = useCallback((item) => {
    setSelectOrder(item);
    setIsOrderOpen(false);
  }, []);

  const getSearchProducts = useCallback(async () => {
    const params = { keyword: keyword };
    if (selectCategory !== null) {
      params.categoryId = selectCategory;
    }
    const response = await getSearchProductsAPI(params);

    if (response?.status === 200) {
      setProducts(response?.data?.products);
      setProductsMeta(response?.data?.meta);
    }
  }, [keyword, selectCategory]);

  useEffect(() => {
    getSearchProducts();
  }, [selectCategory]);

  return (
    <>
      <div className="top_search inr-c">
        <h2 className="m_tit1">
          <span className="c-blue">“{keyword}”</span>の検索結果{" "}
          {totalProductItems || 0}件
        </h2>

        <div className="box_category">
          <div className="tit">カテゴリ</div>
          <div className="cont">
            <ul>
              <li onClick={() => setSelectCategory(null)}>
                <Link to="">すべて({totalProductItems || 0})</Link>
              </li>
              {productCategories?.map((category) => {
                const filterCategory = products?.filter(
                  (product) => product.category?.id === category.id
                );
                return (
                  <li
                    key={`productCategories_${category?.id}`}
                    onClick={() => setSelectCategory(category?.id)}
                  >
                    <Link to="">
                      {category?.name}({filterCategory?.length || 0})
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* 하위메뉴 있을 경우
              <p className="h1">
                <Link to="">
                  <FontAwesomeIcon icon={faCircleChevronLeft} />
                  学校(3841)
                </Link>
              </p>
            */}
            {/* 여긴 무슨 조건인지 모름
              <ul className="dep2">
                <li>
                  <Link to="">すべて(3841)</Link>
                </li>
                <li>
                  <Link to="">学校(1231)</Link>
                </li>
                <li>
                  <Link to="">epub(123)</Link>
                </li>
                <li>
                  <Link to="">api(11)</Link>
                </li>
              </ul>
            */}
          </div>
        </div>

        <div className="sel ta-r">
          <label className="inp_checkbox">
            <input type="checkbox" />
            <span>skp/cs3o</span>
          </label>
          <label className="inp_checkbox">
            <input type="checkbox" />
            <span>obj/fbx</span>
          </label>
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

      <div className="area_schmain2 inr-c">
        <ProductItems items={products} />
      </div>
    </>
  );
};

export default Store;
