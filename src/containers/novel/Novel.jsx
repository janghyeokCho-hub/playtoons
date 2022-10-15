import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { getPostTypes as getPostTypesAPI } from "@API/postService";
import { getCategorys as getCategorysAPI } from "@API/postService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import SearchPopup from "@COMPONENTS/novel/SearchPopup";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import CurationItems from "@COMPONENTS/novel/CurationItems";
import Items from "@COMPONENTS/novel/Items";

const Novel = () => {
  SwiperCore.use([Navigation, Pagination]);
  const [selectTab, setSelectTab] = useState("EVERY");
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);

  /** ===== Post type API Start ===== */
  const [postType, setPostType] = useState([]);
  const getPostTypes = async () => {
    const response = await getPostTypesAPI();
    if (response.status === 200) {
      setPostType(response.data.types);
    }
  };
  useEffect(() => {
    if (!postType?.length) {
      getPostTypes();
    }
  }, [postType]);
  /** ===== Post type API End ===== */

  /** ===== Post type id <=> category API Start ===== */
  const [categorys, setCategorys] = useState([]);
  const getCategorys = async (id) => {
    const response = await getCategorysAPI(id);
    if (response.status === 200) {
      setCategorys(response.data.categories);
    }
  };
  useEffect(() => {
    if (postType?.length && !categorys?.length) {
      const webtoon = postType.find((post) => post.code === "novel");
      getCategorys(webtoon.id);
    }
  }, [categorys, postType]);
  /** ===== Post type id <=> category API End ===== */

  const handleSearchPopup = useCallback(() => {
    setIsSearchPopupShow(!isSearchPopupShow);
  }, [isSearchPopupShow]);

  const [isSelectShow, setIsSelectShow] = useState(false);
  const [selectMenu, setSelectMenu] = useState("おすすめ順");

  const handleSelectMenu = (menu) => {
    setIsSelectShow(!isSelectShow);
    setSelectMenu(menu);
  };

  /**
   * EVERY - 모두
   * COMPLETED - 완결
   * SERIES - 연재
   * SHORT - 단편
   */

  const handleSelectTab = (tab) => {
    setSelectTab(tab);
  };

  return (
    <>
      <div className="contents">
        <div className="inr-c">
          <CurationItems curationNum={5} />

          <div className="tabs ty1">
            <ul>
              <li
                className={selectTab === "EVERY" ? "on" : ""}
                onClick={() => handleSelectTab("EVERY")}
              >
                <a href="#">
                  <span>すべて</span>
                </a>
              </li>
              <li
                className={selectTab === "COMPLETED" ? "on" : ""}
                onClick={() => handleSelectTab("COMPLETED")}
              >
                <a href="#">
                  <span>連載</span>
                </a>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => handleSelectTab("SERIES")}
              >
                <a href="#">
                  <span>完結</span>
                </a>
              </li>
              <li
                className={selectTab === "SHORT" ? "on" : ""}
                onClick={() => handleSelectTab("SHORT")}
              >
                <a href="#">
                  <span>短編</span>
                </a>
              </li>
            </ul>
          </div>

          <Items
            type={selectTab}
            categorys={categorys}
            onSearchPopup={handleSearchPopup}
          />
        </div>
      </div>

      {isSearchPopupShow && (
        <SearchPopup handleClose={() => handleSearchPopup()} />
      )}
    </>
  );
};

export default Novel;
