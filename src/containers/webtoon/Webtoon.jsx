import React, { useState, useEffect, useCallback } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getPostTypes as getPostTypesAPI } from "@API/postService";
import { getCategorys as getCategorysAPI } from "@API/postService";
import Items from "@COMPONENTS/webtoon/Items";
import CurationItems from "@COMPONENTS/webtoon/CurationItems";
import { Link } from "react-router-dom";
import { setContainer } from "@/modules/redux/ducks/container";
import { useDispatch } from "react-redux";

const Webtoon = () => {
  SwiperCore.use([Navigation, Pagination]);
  const dispatch = useDispatch();
  const [selectTab, setSelectTab] = useState("EVERY");

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

  /**
   * EVERY - 모두
   * COMPLETED - 완결
   * SERIES - 연재
   * SHORT - 단편
   */

  const handleSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: true,
      containerClass: "container dashboard webtoon",
      headerClass: "header",
      headerType: null,
      menuType: "MAIN",
      activeMenu: null,
      isDetailView: false,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  return (
    <>
      <div className="contents">
        <div className="inr-c">
          <CurationItems curationNum={4} />

          <div className="tabs ty1">
            <ul>
              <li
                className={selectTab === "EVERY" ? "on" : ""}
                onClick={() => handleSelectTab("EVERY")}
              >
                <Link to="">
                  <span>すべて</span>
                </Link>
              </li>
              <li
                className={selectTab === "COMPLETED" ? "on" : ""}
                onClick={() => handleSelectTab("COMPLETED")}
              >
                <Link to="">
                  <span>連載</span>
                </Link>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => handleSelectTab("SERIES")}
              >
                <Link to="">
                  <span>完結</span>
                </Link>
              </li>
              <li
                className={selectTab === "SHORT" ? "on" : ""}
                onClick={() => handleSelectTab("SHORT")}
              >
                <Link to="">
                  <span>短編</span>
                </Link>
              </li>
            </ul>
          </div>

          <Items tab={selectTab} typeId={typeId} />
        </div>
      </div>
    </>
  );
};

export default Webtoon;
