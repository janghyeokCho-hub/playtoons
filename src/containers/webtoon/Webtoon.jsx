import React, { useState, useCallback, useEffect } from "react";
import SearchPopup from "@COMPONENTS/webtoon/SearchPopup";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getPostTypes as getPostTypesAPI } from "@API/postService";
import { getCategorys as getCategorysAPI } from "@API/postService";
import Items from "@COMPONENTS/webtoon/Items";
import CurationItems from "@COMPONENTS/webtoon/CurationItems";

const Webtoon = () => {
  SwiperCore.use([Navigation, Pagination]);
  const [selectTab, setSelectTab] = useState("EVERY");
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [searchText, setSearchText] = useState(null);

  /** ===== Post type API Start ===== */
  const [postType, setPostType] = useState([]);
  const [typeId, setTypeId] = useState();

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
      const webtoon = postType.find((post) => post.code === "webtoon");
      setTypeId(webtoon.id);
      getCategorys(webtoon.id);
    }
  }, [categorys, postType]);
  /** ===== Post type id <=> category API End ===== */

  const handleSearchPopup = useCallback(() => {
    setIsSearchPopupShow(!isSearchPopupShow);
  }, [isSearchPopupShow]);

  /**
   * EVERY - 모두
   * COMPLETED - 완결
   * SERIES - 연재
   * SHORT - 단편
   */

  const handleSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const handleSearch = (txt) => {
    setSearchText(txt);
  };

  return (
    <>
      <div className="contents">
        <div className="inr-c">
          <CurationItems curationNum={4} categorys={categorys} />

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
            tab={selectTab}
            typeId={typeId}
            onSearchPopup={handleSearchPopup}
            searchText={searchText}
          />
        </div>
      </div>
      {isSearchPopupShow && (
        <SearchPopup
          handleClose={() => handleSearchPopup()}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default Webtoon;
